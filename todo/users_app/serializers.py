from rest_framework.serializers import ModelSerializer

from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserModelSerializer_v2(ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "is_staff", "is_active")
