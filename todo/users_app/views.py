
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin

from .serializers import UserModelSerializer
from .models import User


class UserCustomViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


# ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, GenericViewSet