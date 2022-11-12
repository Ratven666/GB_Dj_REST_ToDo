from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin

from .serializers import UserModelSerializer, UserModelSerializer_v2
from .models import User


class UserCustomViewSet(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializer_v2
        return UserModelSerializer
