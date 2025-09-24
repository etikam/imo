"""
Décorateurs personnalisés pour l'application IMO
"""
from functools import wraps
from django.http import JsonResponse
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from ..permissions import RoleManager, PermissionChecker


def require_authentication(view_func):
    """
    Décorateur pour vérifier l'authentification
    """
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse(
                {'error': 'Authentication required'}, 
                status=401
            )
        return view_func(request, *args, **kwargs)
    return wrapper


def require_permission(permission_name):
    """
    Décorateur pour vérifier une permission spécifique
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


def require_verified_user(view_func):
    """
    Décorateur pour vérifier qu'un utilisateur est vérifié
    """
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse(
                {'error': 'Authentication required'}, 
                status=401
            )
        
        if not request.user.is_verified:
            return JsonResponse(
                {'error': 'Account verification required'}, 
                status=403
            )
        
        return view_func(request, *args, **kwargs)
    return wrapper


def require_active_user(view_func):
    """
    Décorateur pour vérifier qu'un utilisateur est actif
    """
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse(
                {'error': 'Authentication required'}, 
                status=401
            )
        
        if not request.user.is_active:
            return JsonResponse(
                {'error': 'Account is deactivated'}, 
                status=403
            )
        
        return view_func(request, *args, **kwargs)
    return wrapper


def can_manage_user_type(target_user_type):
    """
    Décorateur pour vérifier qu'un manager peut gérer un type d'utilisateur
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return JsonResponse(
                    {'error': 'Authentication required'}, 
                    status=401
                )
            
            if not PermissionChecker.user_can_create_user_type(request.user, target_user_type):
                return JsonResponse(
                    {'error': f'Cannot manage users of type: {target_user_type}'}, 
                    status=403
                )
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator


def rate_limit(max_requests=100, window_seconds=3600):
    """
    Décorateur pour limiter le taux de requêtes
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            # Cette implémentation sera complétée avec Redis ou cache Django
            # Pour l'instant, on laisse passer toutes les requêtes
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator


def log_user_activity(activity_type):
    """
    Décorateur pour logger l'activité des utilisateurs
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            # Log de l'activité avant l'exécution
            if request.user.is_authenticated:
                request.user.update_activity()
                # Ici on pourrait ajouter un log plus détaillé
            
            result = view_func(request, *args, **kwargs)
            
            # Log après l'exécution si nécessaire
            return result
        return wrapper
    return decorator


def api_version(version):
    """
    Décorateur pour spécifier la version de l'API
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            # Ajouter la version dans les headers de réponse
            result = view_func(request, *args, **kwargs)
            
            if isinstance(result, Response):
                result['API-Version'] = version
            elif isinstance(result, JsonResponse):
                result['API-Version'] = version
            
            return result
        return wrapper
    return decorator


def validate_json_data(required_fields=None, optional_fields=None):
    """
    Décorateur pour valider les données JSON
    """
    if required_fields is None:
        required_fields = []
    if optional_fields is None:
        optional_fields = []
    
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if request.method in ['POST', 'PUT', 'PATCH']:
                try:
                    data = request.json() if hasattr(request, 'json') else request.POST
                    
                    # Vérifier les champs obligatoires
                    missing_fields = []
                    for field in required_fields:
                        if field not in data or not data[field]:
                            missing_fields.append(field)
                    
                    if missing_fields:
                        return JsonResponse(
                            {'error': f'Missing required fields: {", ".join(missing_fields)}'}, 
                            status=400
                        )
                    
                    # Vérifier que tous les champs sont autorisés
                    allowed_fields = set(required_fields + optional_fields)
                    provided_fields = set(data.keys())
                    invalid_fields = provided_fields - allowed_fields
                    
                    if invalid_fields:
                        return JsonResponse(
                            {'error': f'Invalid fields: {", ".join(invalid_fields)}'}, 
                            status=400
                        )
                    
                except Exception as e:
                    return JsonResponse(
                        {'error': 'Invalid JSON data'}, 
                        status=400
                    )
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator
