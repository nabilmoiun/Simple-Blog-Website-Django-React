from django.urls import path
from posts.views import posts, post_details

app_name = 'blog'

urlpatterns = [
    path('', posts, name="posts"),
    path('<int:id>/', post_details, name="details"),
]
