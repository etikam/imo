from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
from django.utils import timezone


class BaseUser(AbstractUser):
    """
    Modèle utilisateur de base étendant AbstractUser
    Tous les types d'utilisateurs héritent de cette classe
    """
    
    # Types d'utilisateurs disponibles
    USER_TYPE_CHOICES = [
        ('proprietaire', 'Propriétaire'),
        ('locataire', 'Locataire'),
        ('manager', 'Gestionnaire'),
    ]
    
    # Champs étendus
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPE_CHOICES,
        help_text="Type d'utilisateur"
    )
    
    # Redéfinir les champs de groupes et permissions avec des related_name personnalisés
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="imo_user_set",
        related_query_name="imo_user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="imo_user_set",
        related_query_name="imo_user",
    )
    
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Le numéro de téléphone doit être au format: '+999999999'. Jusqu'à 15 chiffres autorisés."
    )
    phone = models.CharField(
        validators=[phone_regex],
        max_length=17,
        blank=True,
        help_text="Numéro de téléphone"
    )
    
    # Champs de sécurité et de gestion
    is_verified = models.BooleanField(
        default=False,
        help_text="Utilisateur vérifié par un administrateur"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Compte actif"
    )
    created_by = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_users',
        help_text="Utilisateur qui a créé ce compte"
    )
    last_login_ip = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="Dernière adresse IP de connexion"
    )
    must_change_password = models.BooleanField(
        default=True,
        help_text="L'utilisateur doit changer son mot de passe à la prochaine connexion"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_activity = models.DateTimeField(
        default=timezone.now,
        help_text="Dernière activité de l'utilisateur"
    )
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.get_user_type_display()})"
    
    def get_full_name(self):
        """Retourne le nom complet de l'utilisateur"""
        return f"{self.first_name} {self.last_name}".strip() or self.username
    
    def update_activity(self):
        """Met à jour la dernière activité"""
        self.last_activity = timezone.now()
        self.save(update_fields=['last_activity'])
    
    def is_first_login(self):
        """Vérifie si c'est la première connexion de l'utilisateur"""
        return self.must_change_password
    
    def mark_as_verified(self):
        """Marque l'utilisateur comme vérifié"""
        self.is_verified = True
        self.save(update_fields=['is_verified'])
    
    def deactivate(self):
        """Désactive le compte utilisateur"""
        self.is_active = False
        self.save(update_fields=['is_active'])
    
    def activate(self):
        """Active le compte utilisateur"""
        self.is_active = True
        self.save(update_fields=['is_active'])


# Proxy models pour distinguer les types d'utilisateurs dans l'admin
class ProprietaireUser(BaseUser):
    class Meta:
        proxy = True
        verbose_name = "Propriétaire"
        verbose_name_plural = "Propriétaires"


class LocataireUser(BaseUser):
    class Meta:
        proxy = True
        verbose_name = "Locataire"
        verbose_name_plural = "Locataires"


class ManagerUser(BaseUser):
    class Meta:
        proxy = True
        verbose_name = "Gestionnaire"
        verbose_name_plural = "Gestionnaires"
