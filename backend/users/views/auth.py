from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.http import JsonResponse
from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from ..parsers import PlainTextParser
from ..serializers.auth import LoginSerializer, UserSerializer
import json


@ensure_csrf_cookie
@require_GET
def csrf_token_view(request):
    token = get_token(request)
    return JsonResponse({ 'csrfToken': token })


@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([JSONParser, FormParser, MultiPartParser, PlainTextParser])
def login_view(request):
    # Normalise payload: DRF parsers fill request.data.
    # - JSON/Form/MultiPart donnent déjà un dict
    # - PlainTextParser renvoie bytes/str → tenter JSON.parse sans relire request.body
    payload = request.data
    if isinstance(payload, (bytes, str)):
        try:
            if isinstance(payload, bytes):
                payload = json.loads(payload.decode('utf-8'))
            else:
                payload = json.loads(payload)
        except Exception:
            payload = {}
    elif not isinstance(payload, dict) or payload is None:
        payload = {}

    serializer = LoginSerializer(data=payload, context={'request': request})
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    data = UserSerializer(user).data
    return Response({'ok': True, 'user': data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'ok': True}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def me_view(request):
    if not request.user.is_authenticated:
        return Response({'authenticated': False}, status=status.HTTP_200_OK)
    data = UserSerializer(request.user).data
    return Response({'authenticated': True, 'user': data}, status=status.HTTP_200_OK)


