"""
Service de gestion des sessions pour l'application IMO
"""
import logging
from datetime import datetime, timedelta
from django.contrib.sessions.models import Session
from django.contrib.auth import logout
from django.utils import timezone
from django.conf import settings

logger = logging.getLogger(__name__)


class SessionService:
    """
    Service centralisé pour la gestion des sessions
    """
    
    @staticmethod
    def get_user_active_sessions(user):
        """
        Retourne toutes les sessions actives d'un utilisateur
        """
        try:
            active_sessions = Session.objects.filter(
                expire_date__gt=timezone.now()
            )
            
            user_sessions = []
            for session in active_sessions:
                session_data = session.get_decoded()
                if session_data.get('_auth_user_id') == str(user.id):
                    user_sessions.append({
                        'session_key': session.session_key,
                        'expire_date': session.expire_date,
                        'created': session_data.get('_auth_user_backend', ''),
                    })
            
            return user_sessions
            
        except Exception as e:
            logger.error(f"Error getting user sessions: {e}")
            return []
    
    @staticmethod
    def invalidate_user_sessions(user, exclude_session_key=None):
        """
        Invalide toutes les sessions d'un utilisateur sauf celle spécifiée
        """
        try:
            active_sessions = Session.objects.filter(
                expire_date__gt=timezone.now()
            )
            
            sessions_to_delete = []
            for session in active_sessions:
                session_data = session.get_decoded()
                if (session_data.get('_auth_user_id') == str(user.id) and 
                    session.session_key != exclude_session_key):
                    sessions_to_delete.append(session.session_key)
            
            if sessions_to_delete:
                Session.objects.filter(
                    session_key__in=sessions_to_delete
                ).delete()
                
                logger.info(
                    f"Invalidated {len(sessions_to_delete)} sessions for user {user.username}"
                )
                
                return {
                    'success': True,
                    'invalidated_count': len(sessions_to_delete)
                }
            
            return {
                'success': True,
                'invalidated_count': 0
            }
            
        except Exception as e:
            logger.error(f"Error invalidating user sessions: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def extend_session(request, user):
        """
        Étend la session de l'utilisateur
        """
        try:
            if request.session.session_key:
                # Mettre à jour la date d'expiration
                request.session.set_expiry(settings.SESSION_COOKIE_AGE)
                request.session.save()
                
                # Mettre à jour l'activité de l'utilisateur
                user.update_activity()
                
                return {
                    'success': True,
                    'new_expiry': timezone.now() + timedelta(seconds=settings.SESSION_COOKIE_AGE)
                }
            
            return {
                'success': False,
                'error': 'No active session'
            }
            
        except Exception as e:
            logger.error(f"Error extending session: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def get_session_info(request):
        """
        Retourne les informations de la session actuelle
        """
        try:
            if not request.session.session_key:
                return {
                    'success': False,
                    'error': 'No active session'
                }
            
            session = Session.objects.get(session_key=request.session.session_key)
            session_data = session.get_decoded()
            
            # Calculer le temps restant
            time_remaining = session.expire_date - timezone.now()
            time_remaining_seconds = max(0, int(time_remaining.total_seconds()))
            
            return {
                'success': True,
                'session_key': session.session_key,
                'expire_date': session.expire_date,
                'time_remaining_seconds': time_remaining_seconds,
                'is_expired': time_remaining_seconds <= 0,
                'user_id': session_data.get('_auth_user_id'),
            }
            
        except Session.DoesNotExist:
            return {
                'success': False,
                'error': 'Session not found'
            }
        except Exception as e:
            logger.error(f"Error getting session info: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def check_session_warning(request):
        """
        Vérifie si la session va bientôt expirer et retourne un avertissement
        """
        try:
            session_info = SessionService.get_session_info(request)
            
            if not session_info['success']:
                return session_info
            
            time_remaining = session_info['time_remaining_seconds']
            warning_threshold = getattr(settings, 'SESSION_TIMEOUT_WARNING', 300)
            
            if time_remaining <= warning_threshold and time_remaining > 0:
                return {
                    'success': True,
                    'warning': True,
                    'time_remaining_seconds': time_remaining,
                    'message': f'Votre session expire dans {time_remaining // 60} minutes'
                }
            
            return {
                'success': True,
                'warning': False,
                'time_remaining_seconds': time_remaining
            }
            
        except Exception as e:
            logger.error(f"Error checking session warning: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def force_logout_user(user, reason="Forced logout"):
        """
        Force la déconnexion d'un utilisateur
        """
        try:
            # Invalider toutes les sessions de l'utilisateur
            result = SessionService.invalidate_user_sessions(user)
            
            logger.info(f"Forced logout for user {user.username}: {reason}")
            
            return {
                'success': True,
                'reason': reason,
                'invalidated_sessions': result.get('invalidated_count', 0)
            }
            
        except Exception as e:
            logger.error(f"Error forcing logout: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def cleanup_expired_sessions():
        """
        Nettoie les sessions expirées
        """
        try:
            expired_sessions = Session.objects.filter(
                expire_date__lt=timezone.now()
            )
            
            count = expired_sessions.count()
            expired_sessions.delete()
            
            logger.info(f"Cleaned up {count} expired sessions")
            
            return {
                'success': True,
                'cleaned_count': count
            }
            
        except Exception as e:
            logger.error(f"Error cleaning up expired sessions: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def get_session_statistics():
        """
        Retourne les statistiques des sessions
        """
        try:
            total_sessions = Session.objects.count()
            active_sessions = Session.objects.filter(
                expire_date__gt=timezone.now()
            ).count()
            expired_sessions = total_sessions - active_sessions
            
            return {
                'success': True,
                'total_sessions': total_sessions,
                'active_sessions': active_sessions,
                'expired_sessions': expired_sessions,
            }
            
        except Exception as e:
            logger.error(f"Error getting session statistics: {e}")
            return {
                'success': False,
                'error': str(e)
            }
