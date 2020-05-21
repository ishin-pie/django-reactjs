# Django REST API

Building the RESTful API with Django REST framework<br /><br />
Features:
  * Django REST API
  * Token based authentication (which is appropriate for client-server setups, such as mobile clients)
  * Backend and Frontend integration (Django + React JS)
  * Some API endpoints for managing user (such as sign-in, log in, log out)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have python 3 installed

```
Python 3
```

### Installing

A step by step examples that tell you how to get a development env running

Download the project

```
git clone https://github.com/ishin-pie/django-reactjs.git
```

Move into the project repository

```
cd django-reactjs
```

Create a virtual environment to isolate our package dependencies locally

```
python3 -m venv venv
```

Activate the virtual environment

```
source venv/bin/activate
```

Install all the requirements including Django and Django REST framework into the virtual environment

```
pip install -r requirement.txt
```

Next step, move into backend module

```
cd backend/
```
In order to start the project, we need to make the database migrations. For easy way, we create a file called 
"run.sh" to shortcut the commands. Check "run.sh" file for detail.<br />
Here, we will run on the local env

```
bash run.sh MIGRATE
```

Create a default super user. <br />Email: admin@backend.com <br />Password: 12345<br />
Goto "run.sh" file for detail.

```
bash run.sh SUPER_USER
```
Now we can running our project in local env.

```
bash run.sh START
```

When the development server start, we play around with the UI http://127.0.0.1:8000/ 

### Installing front-end module (optional)

First, install all the packages needed (npm is required)
```
cd frontend/

npm install
```

Now we can modify the front-end part, then run:
```
npm run dev
```


## Learn more

* [Django](https://www.djangoproject.com/) - Django is a high-level Python Web framework
* [Django REST framework](https://www.django-rest-framework.org/) - Django REST framework is a powerful and flexible toolkit for building Web APIs.
* [https://reactjs.org/](https://reactjs.org/) - A JavaScript library for building user interfaces

