from django.urls import include, path, re_path
from django.views.generic import TemplateView

from auth_users.views import current_user, change_user_data

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('api/user/', current_user, name='current_user'),
    path('api/user/change/', change_user_data, name='change_user_data'),
    # o include está aqui pois não funciona de dentro do engine, por conta do djoser
    path('assets/', include('assets.urls')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]


