import graphene
from graphene import ObjectType, String, List
from graphene_django import DjangoObjectType
from users_app.models import User
from notes_app.models import Project, Todo

# class Query(ObjectType):
#     hello = String(default_value="stranger")
#
# schema = graphene.Schema(query=Query)

# ------------------------------------------------------------------------------


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = "__all__"


class Query(ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)
    todos_in_project = graphene.List(TodoType, project_id=graphene.Int(required=True))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return Todo.objects.all()
    #
    # def resolve_todos_in_project(root, info, project_id=None):
    #     todos = Todo.objects.all()
    #     if project_id:
    #         todos = todos.filter(project=project_id)
    #     return todos


    def resolve_todos_in_project(root, info, project_id=None):
        todos = Todo.objects.all()
        if project_id:
            return Todo.objects.filter(project=project_id)
        return Todo.objects.all()

schema = graphene.Schema(query=Query)
