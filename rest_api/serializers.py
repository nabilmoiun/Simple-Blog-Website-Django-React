from rest_framework import serializers
from authentication.models import User
from posts.models import Post, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', )


class PostSerializer(serializers.ModelSerializer):
    """Post model serializer"""
    # These are the fields from the User model to be passed with the response data
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'first_name', 'last_name', 'email', 'date', )


class CommentSerializer(serializers.ModelSerializer):
    """Comment model serializer"""
    class Meta:
        model = Comment
        fields = '__all__'


class CreatePostSerializer(serializers.ModelSerializer):
    """Serializer to create new post through api"""
    class Meta:
        model = Post
        fields = '__all__'
