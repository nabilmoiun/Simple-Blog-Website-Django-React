# Blog Django & React Example App

## Deployed on Heroku

The full app is deployed on Heroku. Please click the link [View App Live On Heroku](https://example-blog-grayspace-djreact.herokuapp.com/) to check out live.

## Running

Running on local machine : -

```sh
$ virtualenv venv
$ source venv/bin/activate      # On Linux
$ source venv/Scripts/activate  # On Windows
$ pip install -r requirements.txt
$ npm install
$ python manage.py migrate
$ python manage.py runserver  # Django Server
$ npm start                   # React Server
```

Then visit `http://localhost:3000` to view the full app.

You can also run the the app on `http://localhost:8000`. But you will only find Login and Registration functionality based on Django Views including Jsonholder post and details.

On the other hands, on `http://localhost:3000` the full app can viewed with the integration of Django Rest Framework and Reactjs where you will find the features listed below:

# App Features

+ Dynamic Rendering of [JSONPlaceholder](https://jsonplaceholder.typicode.com/) posts with details and comments by Api calls using axios
+ Posts rendered from django app "posts" created by authenticated users
+ User Registration
+ JWT Authentication
+ Pagination  # 10 post per page for JSONPlaceholder and 4 for app posts
+ Post Creation # Authenticated user can create app posts
+ Comment Section # Users can comment on app posts

## Branches
+ There are two branches. In the main branch, the code is developed where both the django and react server have to be run separately and the full app can be observed on react server `http://localhost:3000`.
+ In the heroku branch, the code is prepared with necessary build and configurations in order to deploy the app on heroku. Here the code is integrated and the whole app can be run on just Django server `http://localhost:8000` alone.

