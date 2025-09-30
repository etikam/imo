"""
Utilitaires pour l'envoi d'emails
"""
import logging
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)


class EmailService:
    """
    Service centralisé pour l'envoi d'emails
    """
    
    @staticmethod
    def send_credentials_email(user, temp_password, created_by=None):
        """
        Envoie les credentials de connexion à un nouvel utilisateur
        """
        try:
            subject = f"Vos identifiants de connexion - {getattr(settings, 'SITE_NAME', 'IMO')}"
            
            # Données pour le template
            context = {
                'user': user,
                'temp_password': temp_password,
                'site_name': getattr(settings, 'SITE_NAME', 'IMO'),
                'frontend_url': getattr(settings, 'FRONTEND_URL', 'http://localhost:3000'),
                'created_by': created_by,
                'user_type_display': user.get_user_type_display(),
            }
            
            # Template HTML
            html_content = render_to_string('emails/credentials.html', context)
            
            # Template texte
            text_content = f"""
            Bonjour {user.get_full_name()},
            
            Votre compte {user.get_user_type_display().lower()} a été créé avec succès.
            
            Vos identifiants de connexion :
            - Nom d'utilisateur : {user.username}
            - Mot de passe temporaire : {temp_password}
            
            IMPORTANT : Vous devrez changer votre mot de passe lors de votre première connexion.
            
            Vous pouvez vous connecter à l'adresse : {context['frontend_url']}
            
            Cordialement,
            L'équipe {context['site_name']}
            """
            
            # Envoi de l'email
            msg = EmailMultiAlternatives(
                subject,
                text_content,
                settings.DEFAULT_FROM_EMAIL,
                [user.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
            logger.info(f"Email de credentials envoyé à {user.email}")
            return True
            
        except Exception as e:
            logger.error(f"Erreur envoi email credentials à {user.email}: {e}")
            return False
    
    @staticmethod
    def send_verification_email(user, verified_by=None):
        """
        Envoie un email de vérification de compte
        """
        try:
            subject = f"Compte vérifié - {getattr(settings, 'SITE_NAME', 'IMO')}"
            
            context = {
                'user': user,
                'site_name': getattr(settings, 'SITE_NAME', 'IMO'),
                'frontend_url': getattr(settings, 'FRONTEND_URL', 'http://localhost:3000'),
                'verified_by': verified_by,
            }
            
            html_content = render_to_string('emails/verification.html', context)
            
            text_content = f"""
            Bonjour {user.get_full_name()},
            
            Votre compte a été vérifié avec succès.
            
            Vous pouvez maintenant vous connecter à l'adresse : {context['frontend_url']}
            
            Cordialement,
            L'équipe {context['site_name']}
            """
            
            msg = EmailMultiAlternatives(
                subject,
                text_content,
                settings.DEFAULT_FROM_EMAIL,
                [user.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
            logger.info(f"Email de vérification envoyé à {user.email}")
            return True
            
        except Exception as e:
            logger.error(f"Erreur envoi email vérification à {user.email}: {e}")
            return False
    
    @staticmethod
    def send_password_reset_email(user, new_password, reset_by=None):
        """
        Envoie un email de réinitialisation de mot de passe
        """
        try:
            subject = f"Mot de passe réinitialisé - {getattr(settings, 'SITE_NAME', 'IMO')}"
            
            context = {
                'user': user,
                'new_password': new_password,
                'site_name': getattr(settings, 'SITE_NAME', 'IMO'),
                'frontend_url': getattr(settings, 'FRONTEND_URL', 'http://localhost:3000'),
                'reset_by': reset_by,
            }
            
            html_content = render_to_string('emails/password_reset.html', context)
            
            text_content = f"""
            Bonjour {user.get_full_name()},
            
            Votre mot de passe a été réinitialisé.
            
            Votre nouveau mot de passe : {new_password}
            
            IMPORTANT : Vous devrez changer ce mot de passe lors de votre prochaine connexion.
            
            Vous pouvez vous connecter à l'adresse : {context['frontend_url']}
            
            Cordialement,
            L'équipe {context['site_name']}
            """
            
            msg = EmailMultiAlternatives(
                subject,
                text_content,
                settings.DEFAULT_FROM_EMAIL,
                [user.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
            logger.info(f"Email de reset password envoyé à {user.email}")
            return True
            
        except Exception as e:
            logger.error(f"Erreur envoi email reset password à {user.email}: {e}")
            return False
    
    @staticmethod
    def send_welcome_email(user):
        """
        Envoie un email de bienvenue
        """
        try:
            subject = f"Bienvenue sur {getattr(settings, 'SITE_NAME', 'IMO')}"
            
            context = {
                'user': user,
                'site_name': getattr(settings, 'SITE_NAME', 'IMO'),
                'frontend_url': getattr(settings, 'FRONTEND_URL', 'http://localhost:3000'),
            }
            
            html_content = render_to_string('emails/welcome.html', context)
            
            text_content = f"""
            Bonjour {user.get_full_name()},
            
            Bienvenue sur {context['site_name']} !
            
            Votre compte {user.get_user_type_display().lower()} est maintenant actif.
            
            Vous pouvez vous connecter à l'adresse : {context['frontend_url']}
            
            Cordialement,
            L'équipe {context['site_name']}
            """
            
            msg = EmailMultiAlternatives(
                subject,
                text_content,
                settings.DEFAULT_FROM_EMAIL,
                [user.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
            logger.info(f"Email de bienvenue envoyé à {user.email}")
            return True
            
        except Exception as e:
            logger.error(f"Erreur envoi email bienvenue à {user.email}: {e}")
            return False
    
    @staticmethod
    def send_account_deactivated_email(user, deactivated_by=None):
        """
        Envoie un email de notification de désactivation de compte
        """
        try:
            subject = f"Compte désactivé - {getattr(settings, 'SITE_NAME', 'IMO')}"
            
            context = {
                'user': user,
                'site_name': getattr(settings, 'SITE_NAME', 'IMO'),
                'deactivated_by': deactivated_by,
            }
            
            html_content = render_to_string('emails/account_deactivated.html', context)
            
            text_content = f"""
            Bonjour {user.get_full_name()},
            
            Votre compte a été désactivé.
            
            Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre support.
            
            Cordialement,
            L'équipe {context['site_name']}
            """
            
            msg = EmailMultiAlternatives(
                subject,
                text_content,
                settings.DEFAULT_FROM_EMAIL,
                [user.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
            logger.info(f"Email de désactivation envoyé à {user.email}")
            return True
            
        except Exception as e:
            logger.error(f"Erreur envoi email désactivation à {user.email}: {e}")
            return False
