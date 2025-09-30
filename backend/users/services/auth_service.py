"""
Service d'authentification pour l'application IMO
"""
import secrets
import string
from datetime import datetime, timedelta
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.db import transaction
from ..models import BaseUser, Proprietaire, Locataire, Manager
from ..permissions import RoleManager


class AuthService:
    """
    Service centralisé pour la gestion de l'authentification
    """
    
    @staticmethod
    def authenticate_user(request, username, password):
        """
        Authentifie un utilisateur et gère la session
        """
        user = authenticate(request, username=username, password=password)
        
        if user is None:
            return {
                'success': False,
                'error': 'Identifiants invalides',
                'user': None
            }
        
        if not user.is_active:
            return {
                'success': False,
                'error': 'Compte désactivé',
                'user': None
            }
        
        if not user.is_verified:
            return {
                'success': False,
                'error': 'Compte non vérifié. Contactez votre administrateur.',
                'user': None
            }
        
        # Invalider les autres sessions (single device)
        AuthService._invalidate_other_sessions(user)
        
        # Mettre à jour les informations de connexion
        user.last_login_ip = AuthService._get_client_ip(request)
        user.update_activity()
        
        # Créer la session
        login(request, user)
        
        return {
            'success': True,
            'error': None,
            'user': user
        }
    
    @staticmethod
    def logout_user(request):
        """
        Déconnecte un utilisateur
        """
        if request.user.is_authenticated:
            logout(request)
            return {'success': True, 'message': 'Déconnexion réussie'}
        return {'success': False, 'error': 'Aucun utilisateur connecté'}
    
    @staticmethod
    def create_user(user_type, user_data, created_by=None):
        """
        Crée un nouvel utilisateur selon son type
        """
        try:
            with transaction.atomic():
                # Générer un mot de passe temporaire
                temp_password = AuthService._generate_temp_password()
                
                # Préparer les données de base
                base_data = {
                    'username': user_data['username'],
                    'email': user_data['email'],
                    'first_name': user_data.get('first_name', ''),
                    'last_name': user_data.get('last_name', ''),
                    'phone': user_data.get('phone', ''),
                    'password': make_password(temp_password),
                    'must_change_password': True,
                    'is_verified': False,
                    'created_by': created_by,
                }
                
                # Créer l'utilisateur selon son type
                if user_type == 'proprietaire':
                    user = Proprietaire.objects.create(
                        **base_data,
                        company_name=user_data.get('company_name', ''),
                        siret=user_data.get('siret', ''),
                        address=user_data.get('address', ''),
                        city=user_data.get('city', ''),
                        postal_code=user_data.get('postal_code', ''),
                        country=user_data.get('country', 'France'),
                        is_company=user_data.get('is_company', False),
                    )
                elif user_type == 'locataire':
                    user = Locataire.objects.create(
                        **base_data,
                        birth_date=user_data.get('birth_date'),
                        occupation=user_data.get('occupation', ''),
                        employer=user_data.get('employer', ''),
                        monthly_income=user_data.get('monthly_income'),
                    )
                elif user_type == 'manager':
                    user = Manager.objects.create(
                        **base_data,
                        employee_id=user_data['employee_id'],
                        access_level=user_data.get('access_level', 'agent'),
                        department=user_data.get('department', ''),
                        position=user_data.get('position', ''),
                        work_phone=user_data.get('work_phone', ''),
                        work_email=user_data.get('work_email', ''),
                        supervisor=user_data.get('supervisor'),
                    )
                else:
                    raise ValueError(f"Type d'utilisateur invalide: {user_type}")
                
                # Envoyer les credentials par email
                AuthService._send_credentials_email(user, temp_password)
                
                return {
                    'success': True,
                    'user': user,
                    'temp_password': temp_password
                }
                
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'user': None
            }
    
    @staticmethod
    def change_password(user, old_password, new_password):
        """
        Change le mot de passe d'un utilisateur
        """
        if not user.check_password(old_password):
            return {
                'success': False,
                'error': 'Ancien mot de passe incorrect'
            }
        
        if len(new_password) < 8:
            return {
                'success': False,
                'error': 'Le mot de passe doit contenir au moins 8 caractères'
            }
        
        user.set_password(new_password)
        user.must_change_password = False
        user.save()
        
        return {
            'success': True,
            'message': 'Mot de passe modifié avec succès'
        }
    
    @staticmethod
    def reset_password(user, new_password):
        """
        Réinitialise le mot de passe d'un utilisateur (admin seulement)
        """
        if len(new_password) < 8:
            return {
                'success': False,
                'error': 'Le mot de passe doit contenir au moins 8 caractères'
            }
        
        user.set_password(new_password)
        user.must_change_password = True
        user.save()
        
        # Envoyer le nouveau mot de passe par email
        AuthService._send_credentials_email(user, new_password)
        
        return {
            'success': True,
            'message': 'Mot de passe réinitialisé et envoyé par email'
        }
    
    @staticmethod
    def verify_user(user, verified_by=None):
        """
        Vérifie un utilisateur
        """
        user.is_verified = True
        user.save()
        
        # Envoyer un email de confirmation
        AuthService._send_verification_email(user)
        
        return {
            'success': True,
            'message': 'Utilisateur vérifié avec succès'
        }
    
    @staticmethod
    def get_user_permissions(user):
        """
        Retourne les permissions d'un utilisateur
        """
        return RoleManager.get_user_permissions(user)
    
    @staticmethod
    def check_user_permission(user, permission):
        """
        Vérifie si un utilisateur a une permission spécifique
        """
        return RoleManager.user_has_permission(user, permission)
    
    # Méthodes privées
    
    @staticmethod
    def _generate_temp_password(length=12):
        """
        Génère un mot de passe temporaire sécurisé
        """
        alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
        password = ''.join(secrets.choice(alphabet) for _ in range(length))
        return password
    
    @staticmethod
    def _get_client_ip(request):
        """
        Récupère l'adresse IP du client
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
    
    @staticmethod
    def _invalidate_other_sessions(user):
        """
        Invalide les autres sessions de l'utilisateur (single device)
        """
        # Cette méthode sera implémentée avec la gestion des sessions
        # Pour l'instant, on met à jour la dernière activité
        user.update_activity()
    
    @staticmethod
    def _send_credentials_email(user, password):
        """
        Envoie les credentials par email
        """
        subject = f"Vos identifiants de connexion - {settings.SITE_NAME}"
        
        message = f"""
        Bonjour {user.get_full_name()},
        
        Votre compte a été créé avec succès.
        
        Vos identifiants de connexion :
        - Nom d'utilisateur : {user.username}
        - Mot de passe temporaire : {password}
        
        IMPORTANT : Vous devrez changer votre mot de passe lors de votre première connexion.
        
        Vous pouvez vous connecter à l'adresse : {settings.FRONTEND_URL}
        
        Cordialement,
        L'équipe {settings.SITE_NAME}
        """
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return True
        except Exception as e:
            print(f"Erreur envoi email: {e}")
            return False
    
    @staticmethod
    def _send_verification_email(user):
        """
        Envoie un email de vérification
        """
        subject = f"Compte vérifié - {settings.SITE_NAME}"
        
        message = f"""
        Bonjour {user.get_full_name()},
        
        Votre compte a été vérifié avec succès.
        
        Vous pouvez maintenant vous connecter à l'adresse : {settings.FRONTEND_URL}
        
        Cordialement,
        L'équipe {settings.SITE_NAME}
        """
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return True
        except Exception as e:
            print(f"Erreur envoi email: {e}")
            return False
