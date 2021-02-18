from django.shortcuts import render
import requests


# POSTS VIEW ENDPOINT
def posts(request):
    url = "https://jsonplaceholder.typicode.com/posts"
    posts = requests.get(url).json()
    return render(request, 'blog-listing.html', {"posts": posts})


# POST DETAILS VIEW ENDPOINT
def post_details(request, id):
    root_url = "https://jsonplaceholder.typicode.com/posts"
    post = requests.get(f"{root_url}/{id}").json()
    comments = requests.get(f"{root_url}/{id}/comments").json()
    context = {
        "post": post,
        "comments": comments
    }
    return render(request, 'blog-post.html', context)