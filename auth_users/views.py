from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def current_user(request):
    user = request.user
    return Response({
        'first_name': user.first_name,
        'last_name': user.last_name,
    })
