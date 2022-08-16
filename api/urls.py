from django.urls import path

from .views import TesteView

urlpatterns = [
    path('', TesteView.as_view()),
]
