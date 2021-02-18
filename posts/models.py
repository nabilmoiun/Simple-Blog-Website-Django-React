from django.db import models
from authentication.models import User


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300, null=True)
    body = models.TextField(null=True)
    date = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='post_comment')
    body = models.TextField(null=True)
    name = models.CharField(max_length=150, null=True)
    email = models.EmailField(null=True)
    date = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.body
