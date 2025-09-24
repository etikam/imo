"""
Service de gestion des utilisateurs pour l'application IMO
"""
from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils import timezone
from ..models import BaseUser, Proprietaire, Locataire, Manager
from ..permissions import PermissionChecker


class UserService:
    """
    Service centralisé pour la gestion des utilisateurs
    """
    
    @staticmethod
    def get_user_by_id(user_id):
        """
        Récupère un utilisateur par son ID
        """
        try:
            return BaseUser.objects.get(id=user_id)
        except BaseUser.DoesNotExist:
            return None
    
    @staticmethod
    def get_user_by_username(username):
        """
        Récupère un utilisateur par son nom d'utilisateur
        """
        try:
            return BaseUser.objects.get(username=username)
        except BaseUser.DoesNotExist:
            return None
    
    @staticmethod
    def get_user_by_email(email):
        """
        Récupère un utilisateur par son email
        """
        try:
            return BaseUser.objects.get(email=email)
        except BaseUser.DoesNotExist:
            return None
    
    @staticmethod
    def get_users_by_type(user_type, active_only=True):
        """
        Récupère tous les utilisateurs d'un type donné
        """
        queryset = BaseUser.objects.filter(user_type=user_type)
        
        if active_only:
            queryset = queryset.filter(is_active=True)
        
        return queryset.order_by('-created_at')
    
    @staticmethod
    def get_managers_by_level(access_level, active_only=True):
        """
        Récupère tous les managers d'un niveau donné
        """
        queryset = Manager.objects.filter(access_level=access_level)
        
        if active_only:
            queryset = queryset.filter(is_active=True, is_active_employee=True)
        
        return queryset.order_by('-created_at')
    
    @staticmethod
    def update_user_profile(user, profile_data):
        """
        Met à jour le profil d'un utilisateur
        """
        try:
            with transaction.atomic():
                # Mettre à jour les champs de base
                for field in ['first_name', 'last_name', 'phone']:
                    if field in profile_data:
                        setattr(user, field, profile_data[field])
                
                # Mettre à jour les champs spécifiques selon le type
                if user.user_type == 'proprietaire':
                    UserService._update_proprietaire_profile(user, profile_data)
                elif user.user_type == 'locataire':
                    UserService._update_locataire_profile(user, profile_data)
                elif user.user_type == 'manager':
                    UserService._update_manager_profile(user, profile_data)
                
                user.save()
                
                return {
                    'success': True,
                    'user': user,
                    'message': 'Profil mis à jour avec succès'
                }
                
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'user': None
            }
    
    @staticmethod
    def activate_user(user, activated_by=None):
        """
        Active un utilisateur
        """
        user.is_active = True
        user.save()
        
        return {
            'success': True,
            'message': 'Utilisateur activé avec succès'
        }
    
    @staticmethod
    def deactivate_user(user, deactivated_by=None):
        """
        Désactive un utilisateur
        """
        user.is_active = False
        user.save()
        
        return {
            'success': True,
            'message': 'Utilisateur désactivé avec succès'
        }
    
    @staticmethod
    def delete_user(user, deleted_by=None):
        """
        Supprime un utilisateur (soft delete)
        """
        # Au lieu de supprimer, on désactive
        return UserService.deactivate_user(user, deleted_by)
    
    @staticmethod
    def get_user_statistics():
        """
        Retourne les statistiques des utilisateurs
        """
        stats = {
            'total_users': BaseUser.objects.count(),
            'active_users': BaseUser.objects.filter(is_active=True).count(),
            'verified_users': BaseUser.objects.filter(is_verified=True).count(),
            'by_type': {},
            'managers_by_level': {},
        }
        
        # Statistiques par type
        for user_type, _ in BaseUser.USER_TYPE_CHOICES:
            stats['by_type'][user_type] = BaseUser.objects.filter(
                user_type=user_type,
                is_active=True
            ).count()
        
        # Statistiques des managers par niveau
        for level, _ in Manager.ACCESS_LEVEL_CHOICES:
            stats['managers_by_level'][level] = Manager.objects.filter(
                access_level=level,
                is_active=True,
                is_active_employee=True
            ).count()
        
        return stats
    
    @staticmethod
    def search_users(query, user_type=None, limit=50):
        """
        Recherche des utilisateurs
        """
        queryset = BaseUser.objects.filter(is_active=True)
        
        if user_type:
            queryset = queryset.filter(user_type=user_type)
        
        # Recherche dans le nom, prénom, email, username
        if query:
            queryset = queryset.filter(
                models.Q(first_name__icontains=query) |
                models.Q(last_name__icontains=query) |
                models.Q(email__icontains=query) |
                models.Q(username__icontains=query)
            )
        
        return queryset[:limit]
    
    @staticmethod
    def get_user_activity_log(user, days=30):
        """
        Retourne le log d'activité d'un utilisateur
        """
        # Cette méthode sera implémentée avec un système de logging
        # Pour l'instant, on retourne des données de base
        return {
            'last_login': user.last_login,
            'last_activity': user.last_activity,
            'created_at': user.created_at,
            'updated_at': user.updated_at,
        }
    
    # Méthodes privées
    
    @staticmethod
    def _update_proprietaire_profile(user, profile_data):
        """
        Met à jour le profil d'un propriétaire
        """
        proprietaire_fields = [
            'company_name', 'siret', 'address', 'city', 
            'postal_code', 'country', 'secondary_email', 
            'website', 'preferred_contact_method', 'is_company'
        ]
        
        for field in proprietaire_fields:
            if field in profile_data:
                setattr(user, field, profile_data[field])
    
    @staticmethod
    def _update_locataire_profile(user, profile_data):
        """
        Met à jour le profil d'un locataire
        """
        locataire_fields = [
            'birth_date', 'occupation', 'employer', 'monthly_income',
            'current_address', 'current_city', 'current_postal_code',
            'preferred_budget_min', 'preferred_budget_max',
            'preferred_cities', 'preferred_property_types',
            'has_guarantor', 'guarantor_name', 'guarantor_phone',
            'preferred_contact_method', 'wants_notifications',
            'wants_market_updates'
        ]
        
        for field in locataire_fields:
            if field in profile_data:
                setattr(user, field, profile_data[field])
    
    @staticmethod
    def _update_manager_profile(user, profile_data):
        """
        Met à jour le profil d'un manager
        """
        manager_fields = [
            'employee_id', 'department', 'position', 'work_phone',
            'work_email', 'supervisor', 'hire_date', 'dashboard_layout',
            'notification_preferences'
        ]
        
        for field in manager_fields:
            if field in profile_data:
                setattr(user, field, profile_data[field])
        
        # Gestion spéciale pour l'access_level
        if 'access_level' in profile_data:
            user.access_level = profile_data['access_level']
            user.set_permissions_by_level()


class UserValidationService:
    """
    Service de validation des utilisateurs
    """
    
    @staticmethod
    def validate_user_data(user_type, user_data):
        """
        Valide les données d'un utilisateur avant création
        """
        errors = []
        
        # Validation des champs obligatoires
        required_fields = ['username', 'email', 'first_name', 'last_name']
        for field in required_fields:
            if not user_data.get(field):
                errors.append(f"Le champ '{field}' est obligatoire")
        
        # Validation de l'email
        if user_data.get('email'):
            if BaseUser.objects.filter(email=user_data['email']).exists():
                errors.append("Cette adresse email est déjà utilisée")
        
        # Validation du username
        if user_data.get('username'):
            if BaseUser.objects.filter(username=user_data['username']).exists():
                errors.append("Ce nom d'utilisateur est déjà utilisé")
        
        # Validation spécifique selon le type
        if user_type == 'manager':
            if not user_data.get('employee_id'):
                errors.append("L'identifiant employé est obligatoire pour les managers")
            elif Manager.objects.filter(employee_id=user_data['employee_id']).exists():
                errors.append("Cet identifiant employé est déjà utilisé")
        
        return {
            'is_valid': len(errors) == 0,
            'errors': errors
        }
    
    @staticmethod
    def validate_password(password):
        """
        Valide un mot de passe
        """
        errors = []
        
        if len(password) < 8:
            errors.append("Le mot de passe doit contenir au moins 8 caractères")
        
        if not any(c.isupper() for c in password):
            errors.append("Le mot de passe doit contenir au moins une majuscule")
        
        if not any(c.islower() for c in password):
            errors.append("Le mot de passe doit contenir au moins une minuscule")
        
        if not any(c.isdigit() for c in password):
            errors.append("Le mot de passe doit contenir au moins un chiffre")
        
        return {
            'is_valid': len(errors) == 0,
            'errors': errors
        }
