from django.urls import path
from .views import UserCustomViewSet


app_name = 'users_app'
urlpatterns = [
    path('', UserCustomViewSet.as_view()),
]