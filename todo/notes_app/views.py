from django.shortcuts import render
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .serializers import ProjectModelSerializer, TodoModelSerializer
from .models import Project, Todo
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission


class StaffOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_fields = ['name', 'users']
    # permission_classes = [StaffOnly]

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_fields = ['project', 'text']
    # permission_classes = [StaffOnly]

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_200_OK)

    def get_queryset(self):
        project = self.request.query_params.get('project', '')
        todos = Todo.objects.all()
        if project:
            todos = todos.filter(project=project)
        return todos
