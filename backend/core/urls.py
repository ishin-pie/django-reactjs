from django.urls import path
from knox import views as knox_views
from .views import LoginView
from .views import GetMeView
from .views import UserListView
from .views import RegisterView
from .views import UpdateDeleteUserView
from .views import GetUserDetailView

urlpatterns = [
    path('api/v1/auth/me', GetMeView.as_view()),
    path('api/v1/auth/login', LoginView.as_view()),
    path('api/v1/auth/logout', knox_views.LogoutView.as_view()),
    path('api/v1/auth/register', RegisterView.as_view()),
    path('api/v1/users', UserListView.as_view()),
    path('api/v1/users/<int:pk>', UpdateDeleteUserView.as_view()),
    path('api/v1/users/<int:pk>/detail', GetUserDetailView.as_view()),
]
