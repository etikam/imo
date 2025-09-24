"""
Définition des rôles et permissions pour l'application IMO
"""
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.db import models


class RoleManager:
    """
    Gestionnaire des rôles et permissions
    """
    
    # Définition des rôles
    ROLES = {
        'proprietaire': {
            'name': 'Propriétaire',
            'description': 'Propriétaire de biens immobiliers',
            'permissions': [
                'view_own_properties',
                'add_own_properties', 
                'change_own_properties',
                'delete_own_properties',
                'view_own_contracts',
                'view_own_tenants',
                'manage_own_profile',
            ]
        },
        'locataire': {
            'name': 'Locataire',
            'description': 'Locataire de biens immobiliers',
            'permissions': [
                'view_own_contracts',
                'view_own_payments',
                'make_payments',
                'manage_own_profile',
                'view_available_properties',
            ]
        },
        'manager_agent': {
            'name': 'Agent Gestionnaire',
            'description': 'Agent de gestion immobilière',
            'permissions': [
                'view_properties',
                'add_properties',
                'change_properties',
                'view_contracts',
                'view_tenants',
                'view_owners',
                'manage_own_profile',
                'access_dashboard_basic',
            ]
        },
        'manager_manager': {
            'name': 'Manager Gestionnaire',
            'description': 'Manager de gestion immobilière',
            'permissions': [
                'view_properties',
                'add_properties',
                'change_properties',
                'delete_properties',
                'view_contracts',
                'add_contracts',
                'change_contracts',
                'view_tenants',
                'view_owners',
                'add_users',
                'change_users',
                'view_users',
                'manage_own_profile',
                'access_dashboard_full',
                'access_analytics',
                'manage_agents',
            ]
        },
        'manager_admin': {
            'name': 'Administrateur Gestionnaire',
            'description': 'Administrateur système',
            'permissions': [
                'view_properties',
                'add_properties',
                'change_properties',
                'delete_properties',
                'view_contracts',
                'add_contracts',
                'change_contracts',
                'delete_contracts',
                'view_tenants',
                'add_tenants',
                'change_tenants',
                'delete_tenants',
                'view_owners',
                'add_owners',
                'change_owners',
                'delete_owners',
                'add_users',
                'change_users',
                'delete_users',
                'view_users',
                'manage_own_profile',
                'access_dashboard_full',
                'access_analytics',
                'manage_agents',
                'manage_managers',
                'access_financial_data',
                'system_admin',
            ]
        }
    }
    
    @classmethod
    def get_role_permissions(cls, role_name):
        """
        Retourne les permissions pour un rôle donné
        """
        return cls.ROLES.get(role_name, {}).get('permissions', [])
    
    @classmethod
    def get_all_roles(cls):
        """
        Retourne tous les rôles disponibles
        """
        return cls.ROLES
    
    @classmethod
    def get_user_role(cls, user):
        """
        Détermine le rôle d'un utilisateur basé sur son type et niveau d'accès
        """
        if user.user_type == 'proprietaire':
            return 'proprietaire'
        elif user.user_type == 'locataire':
            return 'locataire'
        elif user.user_type == 'manager':
            if hasattr(user, 'access_level'):
                if user.access_level == 'agent':
                    return 'manager_agent'
                elif user.access_level == 'manager':
                    return 'manager_manager'
                elif user.access_level == 'admin':
                    return 'manager_admin'
            return 'manager_agent'  # Par défaut
        return None
    
    @classmethod
    def user_has_permission(cls, user, permission_name):
        """
        Vérifie si un utilisateur a une permission spécifique
        """
        role = cls.get_user_role(user)
        if not role:
            return False
        
        role_permissions = cls.get_role_permissions(role)
        return permission_name in role_permissions
    
    @classmethod
    def get_user_permissions(cls, user):
        """
        Retourne toutes les permissions d'un utilisateur
        """
        role = cls.get_user_role(user)
        if not role:
            return []
        
        return cls.get_role_permissions(role)


class CustomPermission(models.Model):
    """
    Modèle pour les permissions personnalisées
    """
    name = models.CharField(max_length=100, unique=True)
    codename = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, default='custom')
    
    class Meta:
        verbose_name = "Permission personnalisée"
        verbose_name_plural = "Permissions personnalisées"
        ordering = ['category', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.codename})"


class UserRole(models.Model):
    """
    Modèle pour associer des rôles personnalisés aux utilisateurs
    """
    user = models.OneToOneField(
        'user.BaseUser',
        on_delete=models.CASCADE,
        related_name='custom_role'
    )
    role_name = models.CharField(max_length=50)
    custom_permissions = models.ManyToManyField(
        CustomPermission,
        blank=True,
        related_name='user_roles'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Rôle utilisateur"
        verbose_name_plural = "Rôles utilisateurs"
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.role_name}"
    
    def get_all_permissions(self):
        """
        Retourne toutes les permissions de l'utilisateur (rôle + personnalisées)
        """
        # Permissions du rôle de base
        role_permissions = RoleManager.get_user_permissions(self.user)
        
        # Permissions personnalisées
        custom_permissions = list(self.custom_permissions.values_list('codename', flat=True))
        
        return list(set(role_permissions + custom_permissions))
