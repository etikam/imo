"""
Permissions personnalisées et décorateurs pour l'application IMO
"""
from functools import wraps
from django.http import JsonResponse
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from .roles import RoleManager


def require_permission(permission_name):
    """
    Décorateur pour vérifier qu'un utilisateur a une permission spécifique
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return JsonResponse(
                    {'error': 'Authentication required'}, 
                    status=401
                )
            
            if not RoleManager.user_has_permission(request.user, permission_name):
                return JsonResponse(
                    {'error': f'Permission required: {permission_name}'}, 
                    status=403
                )
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator


def require_user_type(user_types):
    """
    Décorateur pour vérifier le type d'utilisateur
    """
    if isinstance(user_types, str):
        user_types = [user_types]
    
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return JsonResponse(
                    {'error': 'Authentication required'}, 
                    status=401
                )
            
            if request.user.user_type not in user_types:
                return JsonResponse(
                    {'error': f'User type required: {", ".join(user_types)}'}, 
                    status=403
                )
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator


def require_manager_level(min_level):
    """
    Décorateur pour vérifier le niveau d'accès des managers
    """
    level_hierarchy = {'agent': 1, 'manager': 2, 'admin': 3}
    
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return JsonResponse(
                    {'error': 'Authentication required'}, 
                    status=401
                )
            
            if request.user.user_type != 'manager':
                return JsonResponse(
                    {'error': 'Manager access required'}, 
                    status=403
                )
            
            user_level = getattr(request.user, 'access_level', 'agent')
            if level_hierarchy.get(user_level, 0) < level_hierarchy.get(min_level, 0):
                return JsonResponse(
                    {'error': f'Manager level required: {min_level} or higher'}, 
                    status=403
                )
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator


class PermissionMixin:
    """
    Mixin pour les vues basées sur les classes avec gestion des permissions
    """
    
    def check_permission(self, permission_name):
        """
        Vérifie si l'utilisateur a une permission spécifique
        """
        if not self.request.user.is_authenticated:
            return False
        return RoleManager.user_has_permission(self.request.user, permission_name)
    
    def check_user_type(self, user_types):
        """
        Vérifie le type d'utilisateur
        """
        if not self.request.user.is_authenticated:
            return False
        
        if isinstance(user_types, str):
            user_types = [user_types]
        
        return self.request.user.user_type in user_types
    
    def check_manager_level(self, min_level):
        """
        Vérifie le niveau d'accès des managers
        """
        if not self.request.user.is_authenticated:
            return False
        
        if self.request.user.user_type != 'manager':
            return False
        
        level_hierarchy = {'agent': 1, 'manager': 2, 'admin': 3}
        user_level = getattr(self.request.user, 'access_level', 'agent')
        
        return level_hierarchy.get(user_level, 0) >= level_hierarchy.get(min_level, 0)
    
    def permission_denied_response(self, message="Permission denied"):
        """
        Retourne une réponse d'erreur de permission
        """
        return Response(
            {'error': message}, 
            status=status.HTTP_403_FORBIDDEN
        )


def can_manage_user(manager, target_user):
    """
    Vérifie si un manager peut gérer un utilisateur spécifique
    """
    if not manager.user_type == 'manager':
        return False
    
    # Les admins peuvent tout gérer
    if hasattr(manager, 'access_level') and manager.access_level == 'admin':
        return True
    
    # Les managers peuvent gérer les propriétaires et locataires
    if (hasattr(manager, 'access_level') and 
        manager.access_level == 'manager' and 
        target_user.user_type in ['proprietaire', 'locataire']):
        return True
    
    # Les agents ne peuvent pas gérer d'utilisateurs
    return False


def can_access_property(user, property_obj):
    """
    Vérifie si un utilisateur peut accéder à une propriété spécifique
    """
    if not user.is_authenticated:
        return False
    
    # Les managers peuvent accéder à toutes les propriétés
    if user.user_type == 'manager':
        return True
    
    # Les propriétaires peuvent accéder à leurs propres propriétés
    if user.user_type == 'proprietaire':
        # Ici on devrait vérifier la relation propriétaire-propriété
        # Pour l'instant, on retourne True si c'est un propriétaire
        return True
    
    # Les locataires peuvent voir les propriétés disponibles
    if user.user_type == 'locataire':
        # Ici on devrait vérifier si la propriété est disponible
        # Pour l'instant, on retourne True
        return True
    
    return False


def can_access_contract(user, contract_obj):
    """
    Vérifie si un utilisateur peut accéder à un contrat spécifique
    """
    if not user.is_authenticated:
        return False
    
    # Les managers peuvent accéder à tous les contrats
    if user.user_type == 'manager':
        return True
    
    # Les propriétaires peuvent accéder aux contrats de leurs propriétés
    if user.user_type == 'proprietaire':
        # Ici on devrait vérifier la relation propriétaire-contrat
        return True
    
    # Les locataires peuvent accéder à leurs propres contrats
    if user.user_type == 'locataire':
        # Ici on devrait vérifier la relation locataire-contrat
        return True
    
    return False


class PermissionChecker:
    """
    Classe utilitaire pour vérifier les permissions
    """
    
    @staticmethod
    def user_can_create_user_type(manager, target_user_type):
        """
        Vérifie si un manager peut créer un type d'utilisateur spécifique
        """
        if not manager.user_type == 'manager':
            return False
        
        if not hasattr(manager, 'can_create_users') or not manager.can_create_users:
            return False
        
        # Les admins peuvent créer tous les types
        if hasattr(manager, 'access_level') and manager.access_level == 'admin':
            return True
        
        # Les managers peuvent créer propriétaires et locataires
        if (hasattr(manager, 'access_level') and 
            manager.access_level == 'manager' and 
            target_user_type in ['proprietaire', 'locataire']):
            return True
        
        return False
    
    @staticmethod
    def get_user_accessible_objects(user, model_class, filter_field=None):
        """
        Retourne les objets qu'un utilisateur peut accéder selon son type
        """
        if not user.is_authenticated:
            return model_class.objects.none()
        
        # Les managers peuvent tout voir
        if user.user_type == 'manager':
            return model_class.objects.all()
        
        # Pour les autres types, on filtre selon les relations
        # Cette méthode sera étendue selon les modèles spécifiques
        return model_class.objects.all()
