from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def current_user(request):
    user = request.user

    return Response({
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email
    })


@api_view(['POST'])
def change_user_data(request):
    user = request.user
    if 'firstName' in request.data.keys():
        first_name = request.data['firstName']
        user.first_name = first_name

    elif 'lastName' in request.data.keys():
        last_name = request.data['lastName']
        user.last_name = last_name

    elif 'email' in request.data.keys():
        email = request.data['email']
        user.email = email

    user.save()
    return Response(
        {
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': user.email
        }
    )
