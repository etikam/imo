"""
Middleware personnalisé pour la gestion des sessions
"""
import logging
from django.contrib.sessions.models import Session
from django.contrib.auth import logout
from django.utils import timezone
from django.conf import settings

logger = logging.getLogger(__name__)


class SingleDeviceSessionMiddleware:
    """
    Middleware pour gérer les sessions single device
    Un utilisateur ne peut être connecté que sur un seul appareil à la fois
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # Traitement avant la vue
        if request.user.is_authenticated:
            self._handle_single_device_session(request)
        
        response = self.get_response(request)
        
        # Traitement après la vue
        return response
    
    def _handle_single_device_session(self, request):
        """
        Gère la session single device
        """
        try:
            current_session_key = request.session.session_key
            user = request.user
            
            # Récupérer toutes les sessions actives de l'utilisateur
            active_sessions = Session.objects.filter(
                expire_date__gt=timezone.now()
            ).exclude(
                session_key=current_session_key
            )
            
            # Filtrer les sessions qui appartiennent à cet utilisateur
            user_sessions_to_delete = []
            for session in active_sessions:
                session_data = session.get_decoded()
                if session_data.get('_auth_user_id') == str(user.id):
                    user_sessions_to_delete.append(session.session_key)
            
            # Supprimer les autres sessions de l'utilisateur
            if user_sessions_to_delete:
                Session.objects.filter(
                    session_key__in=user_sessions_to_delete
                ).delete()
                
                logger.info(
                    f"Deleted {len(user_sessions_to_delete)} sessions for user {user.username}"
                )
            
            # Mettre à jour la dernière activité
            user.update_activity()
            
        except Exception as e:
            logger.error(f"Error in SingleDeviceSessionMiddleware: {e}")


class SessionSecurityMiddleware:
    """
    Middleware pour la sécurité des sessions
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # Traitement avant la vue
        if request.user.is_authenticated:
            self._check_session_security(request)
        
        response = self.get_response(request)
        
        # Traitement après la vue
        return response
    
    def _check_session_security(self, request):
        """
        Vérifie la sécurité de la session
        """
        try:
            user = request.user
            
            # Vérifier si l'utilisateur est toujours actif
            if not user.is_active:
                logger.warning(f"Inactive user {user.username} attempted to access")
                logout(request)
                return
            
            # Vérifier si l'utilisateur est vérifié
            if not user.is_verified:
                logger.warning(f"Unverified user {user.username} attempted to access")
                # On peut choisir de déconnecter ou de rediriger vers une page de vérification
                # logout(request)
                return
            
            # Vérifier l'IP de connexion (optionnel)
            current_ip = self._get_client_ip(request)
            if hasattr(user, 'last_login_ip') and user.last_login_ip:
                # On peut ajouter une vérification d'IP ici si nécessaire
                pass
            
            # Mettre à jour l'IP de connexion
            if hasattr(user, 'last_login_ip'):
                user.last_login_ip = current_ip
                user.save(update_fields=['last_login_ip'])
            
        except Exception as e:
            logger.error(f"Error in SessionSecurityMiddleware: {e}")
    
    def _get_client_ip(self, request):
        """
        Récupère l'adresse IP du client
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class UserActivityMiddleware:
    """
    Middleware pour tracker l'activité des utilisateurs
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # Traitement avant la vue
        if request.user.is_authenticated:
            self._track_user_activity(request)
        
        response = self.get_response(request)
        
        # Traitement après la vue
        return response
    

class RoleRouteGuardMiddleware:
    """
    Enforce user_type based on API URL prefixes so backend is the source of truth.
    - /api/proprietaire/... → requires user_type == 'proprietaire'
    - /api/gestionnaire/... → requires user_type == 'manager'
    - /api/locataire/...    → requires user_type == 'locataire'
    Auth routes and non-API routes are ignored.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path or ''

        # Only guard API routes outside auth endpoints
        if path.startswith('/api/') and not path.startswith('/api/v1/auth/'):
            required = None
            if path.startswith('/api/proprietaire/'):
                required = 'proprietaire'
            elif path.startswith('/api/gestionnaire/'):
                required = 'manager'
            elif path.startswith('/api/locataire/'):
                required = 'locataire'

            if required:
                user = getattr(request, 'user', None)
                if not user or not user.is_authenticated:
                    from django.http import JsonResponse
                    return JsonResponse({'error': 'Authentication required'}, status=401)
                if getattr(user, 'user_type', None) != required:
                    from django.http import JsonResponse
                    return JsonResponse({'error': f'User type required: {required}'}, status=403)

        return self.get_response(request)

    def _track_user_activity(self, request):
        """
        Track l'activité de l'utilisateur
        """
        try:
            user = request.user
            
            # Mettre à jour la dernière activité
            user.update_activity()
            
            # Log de l'activité (optionnel)
            if hasattr(settings, 'LOG_USER_ACTIVITY') and settings.LOG_USER_ACTIVITY:
                logger.info(
                    f"User {user.username} accessed {request.path} from {self._get_client_ip(request)}"
                )
            
        except Exception as e:
            logger.error(f"Error in UserActivityMiddleware: {e}")
    
    def _get_client_ip(self, request):
        """
        Récupère l'adresse IP du client
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
