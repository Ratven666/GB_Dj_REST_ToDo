from django.db import models

from todo.users_app.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    rep_url = models.URLField(max_length=200)
    users = models.ManyToManyField(User)

    def __str__(self):
        return f"{self.name}"


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    root_user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Pr: {self.project} - text{self.text[:28]}..."
