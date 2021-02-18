from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from .views import (UserRegisterView, LoginViewSimpleJWT,
                    GetUsers, GetPosts, GetPostComment, CreatePost, GetSinglePost, PostComment)

app_name = 'rest_api_app'

urlpatterns = [
    path('register/', UserRegisterView.as_view()),
    path('login/', LoginViewSimpleJWT.as_view(), name='token_obtain_pair'),
    path('refresh_token/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('get_users/', GetUsers.as_view(), name='get_user_api'),
    path('get_posts/', GetPosts.as_view()),
    path('get_single_post/<int:pk>/', GetSinglePost.as_view()),
    path('get_post_comments/<int:post_id>/', GetPostComment.as_view()),
    path('create_post/', CreatePost.as_view()),
    path('post_comment/', PostComment.as_view()),
]

