"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from users_app.views import UserCustomViewSet
from notes_app.views import ProjectModelViewSet
from notes_app.views import TodoModelViewSet

router = DefaultRouter()
# router.register("users", UserCustomViewSet)
router.register("project", ProjectModelViewSet)

router.register("todo", TodoModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path("api-token-auth/", views.obtain_auth_token),
    path("", include(router.urls)),
    # path('api/users/0.1', include('users_app.urls', namespace='0.1')),
    # path('api/users/0.2', include('users_app.urls', namespace='0.2')),
    # path('api/<str:version>/users/', UserCustomViewSet.as_view()),
    path('users/', UserCustomViewSet.as_view()),
    path("swagger<str:format>/", schema_view.without_ui()),
    path("swagger/", schema_view.with_ui("swagger")),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
