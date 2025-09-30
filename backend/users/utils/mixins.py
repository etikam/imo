"""
Mixins pour les vues de l'application IMO
"""
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from ..permissions import RoleManager, PermissionChecker


class UserPermissionMixin:
    """
    Mixin pour la gestion des permissions utilisateur
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
    
    def authentication_required_response(self):
        """
        Retourne une réponse d'erreur d'authentification
        """
        return Response(
            {'error': 'Authentication required'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )


class UserTypeFilterMixin:
    """
    Mixin pour filtrer les données selon le type d'utilisateur
    """
    
    def get_queryset(self):
        """
        Filtre le queryset selon le type d'utilisateur
        """
        queryset = super().get_queryset()
        
        if not self.request.user.is_authenticated:
            return queryset.none()
        
        # Les managers peuvent tout voir
        if self.request.user.user_type == 'manager':
            return queryset
        
        # Pour les autres types, on filtre selon les relations
        # Cette méthode sera étendue dans les vues spécifiques
        return queryset


class UserActivityMixin:
    """
    Mixin pour tracker l'activité des utilisateurs
    """
    
    def dispatch(self, request, *args, **kwargs):
        """
        Met à jour l'activité de l'utilisateur à chaque requête
        """
        if request.user.is_authenticated:
            request.user.update_activity()
        
        return super().dispatch(request, *args, **kwargs)


class UserLoggingMixin:
    """
    Mixin pour logger les actions des utilisateurs
    """
    
    def log_user_action(self, action, details=None):
        """
        Log une action utilisateur
        """
        if self.request.user.is_authenticated:
            # Ici on pourrait implémenter un système de logging plus avancé
            user = self.request.user
            print(f"User {user.username} performed action: {action}")
            if details:
                print(f"Details: {details}")


class APIVersionMixin:
    """
    Mixin pour gérer les versions d'API
    """
    
    api_version = 'v1'
    
    def dispatch(self, request, *args, **kwargs):
        """
        Ajoute la version de l'API dans les headers de réponse
        """
        response = super().dispatch(request, *args, **kwargs)
        
        if hasattr(response, 'data'):
            response['API-Version'] = self.api_version
        
        return response


class UserValidationMixin:
    """
    Mixin pour la validation des données utilisateur
    """
    
    def validate_user_data(self, data, user_type=None):
        """
        Valide les données d'un utilisateur
        """
        errors = []
        
        # Validation des champs obligatoires
        required_fields = ['username', 'email', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                errors.append(f"Le champ '{field}' est obligatoire")
        
        # Validation de l'email
        if data.get('email'):
            from ..models import BaseUser
            existing_user = BaseUser.objects.filter(email=data['email']).first()
            if existing_user and existing_user.id != getattr(self, 'object', None):
                errors.append("Cette adresse email est déjà utilisée")
        
        # Validation du username
        if data.get('username'):
            from ..models import BaseUser
            existing_user = BaseUser.objects.filter(username=data['username']).first()
            if existing_user and existing_user.id != getattr(self, 'object', None):
                errors.append("Ce nom d'utilisateur est déjà utilisé")
        
        return {
            'is_valid': len(errors) == 0,
            'errors': errors
        }
    
    def validation_error_response(self, errors):
        """
        Retourne une réponse d'erreur de validation
        """
        return Response(
            {'error': 'Validation failed', 'details': errors}, 
            status=status.HTTP_400_BAD_REQUEST
        )


class UserSearchMixin:
    """
    Mixin pour la recherche d'utilisateurs
    """
    
    def get_search_queryset(self, queryset):
        """
        Applique les filtres de recherche
        """
        search_query = self.request.query_params.get('search', None)
        user_type = self.request.query_params.get('user_type', None)
        is_active = self.request.query_params.get('is_active', None)
        is_verified = self.request.query_params.get('is_verified', None)
        
        if search_query:
            queryset = queryset.filter(
                models.Q(first_name__icontains=search_query) |
                models.Q(last_name__icontains=search_query) |
                models.Q(email__icontains=search_query) |
                models.Q(username__icontains=search_query)
            )
        
        if user_type:
            queryset = queryset.filter(user_type=user_type)
        
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        
        if is_verified is not None:
            queryset = queryset.filter(is_verified=is_verified.lower() == 'true')
        
        return queryset


class UserPaginationMixin:
    """
    Mixin pour la pagination des utilisateurs
    """
    
    def get_paginated_response(self, data):
        """
        Retourne une réponse paginée avec des métadonnées utilisateur
        """
        response = super().get_paginated_response(data)
        
        # Ajouter des métadonnées spécifiques aux utilisateurs
        if hasattr(self, 'request') and self.request.user.is_authenticated:
            response.data['user_info'] = {
                'user_type': self.request.user.user_type,
                'permissions': RoleManager.get_user_permissions(self.request.user),
                'can_create_users': PermissionChecker.user_can_create_user_type(
                    self.request.user, 'proprietaire'
                ),
            }
        
        return response


class UserStatsMixin:
    """
    Mixin pour les statistiques des utilisateurs
    """
    
    def get_user_stats(self):
        """
        Retourne les statistiques des utilisateurs
        """
        from ..models import BaseUser, Manager
        
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
