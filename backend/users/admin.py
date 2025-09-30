from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import BaseUser, ProprietaireUser, LocataireUser, ManagerUser


@admin.register(BaseUser)
class BaseUserAdmin(UserAdmin):
    list_display = (
        'username', 'email', 'first_name', 'last_name', 'user_type',
        'is_active', 'is_staff', 'is_superuser', 'is_verified', 'last_login'
    )
    list_filter = ('user_type', 'is_active', 'is_staff', 'is_superuser', 'is_verified')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-date_joined',)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'phone', 'user_type')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_verified', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined', 'last_activity')}),
        (_('Audit'), {'fields': ('last_login_ip', 'created_by')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'user_type', 'phone', 'password1', 'password2', 'is_active', 'is_staff', 'is_verified'),
        }),
    )


@admin.register(ProprietaireUser)
class ProprietaireAdmin(BaseUserAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user_type='proprietaire')

    def save_model(self, request, obj, form, change):
        obj.user_type = 'proprietaire'
        if not change and not obj.created_by_id:
            obj.created_by = request.user if request.user.is_authenticated else None
        super().save_model(request, obj, form, change)


@admin.register(LocataireUser)
class LocataireAdmin(BaseUserAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user_type='locataire')

    def save_model(self, request, obj, form, change):
        obj.user_type = 'locataire'
        if not change and not obj.created_by_id:
            obj.created_by = request.user if request.user.is_authenticated else None
        super().save_model(request, obj, form, change)


@admin.register(ManagerUser)
class ManagerAdmin(BaseUserAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user_type='manager')

    def save_model(self, request, obj, form, change):
        obj.user_type = 'manager'
        if not change and not obj.created_by_id:
            obj.created_by = request.user if request.user.is_authenticated else None
        super().save_model(request, obj, form, change)

