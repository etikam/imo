from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=50)
    password = serializers.CharField(write_only=True, required=True, trim_whitespace=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError({'non_field_errors': [msg]}, code='authorization')
            if not getattr(user, 'is_verified', True):
                raise serializers.ValidationError({'non_field_errors': [_('Account not verified.')]} , code='authorization')
            if not user.is_active:
                raise serializers.ValidationError({'non_field_errors': [_('Account disabled.')]} , code='authorization')
            attrs['user'] = user
            return attrs
        raise serializers.ValidationError({'non_field_errors': [_('Must include "username" and "password".')]})


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    email = serializers.EmailField(allow_blank=True)
    user_type = serializers.CharField(allow_null=True, required=False)


