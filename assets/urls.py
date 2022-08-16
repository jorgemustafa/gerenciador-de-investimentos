from django.urls import path

from .views import AcaoFiiView

urlpatterns = [
    path('', AcaoFiiView.as_view()),
]
