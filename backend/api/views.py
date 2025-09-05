from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def health(request):
    return Response({
        'status': 'ok',
        'service': 'backend',
    })


@api_view(['GET'])
def demo(request):
    data = {
        'message': 'Bienvenue sur l’API ITCHOH',
        'features': ['auth', 'biens', 'locataires', 'proprietaires']
    }
    return Response(data)

from django.shortcuts import render

# Create your views here.
