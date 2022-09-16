from django.urls import include, path, re_path
from django.views.generic import TemplateView

from auth_users.views import current_user

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('api/user/', current_user, name='current_user'),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]


