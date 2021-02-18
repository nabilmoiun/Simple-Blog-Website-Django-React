from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import FormParser, JSONParser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView

from authentication.models import User
from posts.models import Post, Comment
from .serializers import UserSerializer, PostSerializer, CommentSerializer, CreatePostSerializer


class MyTokenObtainSerilizer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Customize response dictionary with extra data
        data['email'] = self.user.email
        data['user'] = self.user.pk
        data['response'] = "login successful"
        
        return data


class LoginViewSimpleJWT(TokenObtainPairView):
    """ Generates Authorization Bearer access token to authenticate the user"""
    serializer_class = MyTokenObtainSerilizer


class UserRegisterView(APIView):
    """ Creates new user"""
    parser_classes = (FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        required_fields = ['email', 'first_name', 'last_name', 'password1', 'password2']
        post_data = dict(request.data)

        # Check if any field is missing
        for field in required_fields:
            if field not in post_data:
                return Response({"response": f"{field} must be set"},
                                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        email = User.objects.filter(email=post_data['email'])
        if email.exists():
            return Response({"response": "email already exists"},
                            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        if len(post_data['password1']) <= 6 or len(post_data['password2']) <=6:
            return Response({"response": "Minimum lenght of password must be greater than 6"},
                            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        if post_data['password1'] != post_data['password2']:
            return Response({"response": "Passwords don't match"},
                            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        user = User.objects.create_user(
            email=post_data['email'],
            first_name=post_data['first_name'],
            last_name=post_data['last_name'],
            password=post_data['password1']
        )
        # Response data to be passed
        new_user = {
            "response": "Your Registration Is Successful",
            "id": user.id,
            "name": user.first_name,
            "email": user.email
        }
        user.set_password(post_data['password1'])
        user.save()
        return Response(new_user, status=status.HTTP_200_OK)


class GetUsers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetPosts(ListAPIView):
    """Returns all of the posts from the database ordered by id descending"""
    queryset = Post.objects.order_by('-id')
    serializer_class = PostSerializer


class GetPostComment(APIView):
    """Returns the comments for a specific post"""
    def get(self, *args, **kwargs):
        post_id = kwargs.get('post_id')
        comments = Comment.objects.filter(post__id=post_id).order_by('-date')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class GetSinglePost(RetrieveAPIView):
    """Returns the data for a specific post"""
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CreatePost(CreateAPIView):
    """Create new post"""
    permission_classes = (IsAuthenticated, )
    serializer_class = CreatePostSerializer
    queryset = Post.objects.all()


class PostComment(CreateAPIView):
    """Comments for a post"""
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

