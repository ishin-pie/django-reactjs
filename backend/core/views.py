from django.contrib.auth import login
from django.http import Http404
from rest_framework import permissions
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from knox.views import LoginView as KnoxLoginView
from knox.models import AuthToken
from .serializers import UserSerializer
from .serializers import RegisterSerializer
from .models import User
from .permission import IsSuperUser


# REGISTER API
class RegisterView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token_instance, token = AuthToken.objects.create(user)
        return Response({
            'token': token,
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
        })


# LOGIN API (overwrite Knox Login API)
class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def get_post_response_data(self, request, token, instance):
        data = {
            'token': token,
            'user': UserSerializer(request.user, context=self.get_context()).data,
        }
        return data

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)


# GET CURRENT LOGIN USER
class GetMeView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


# GET USER LIST
class UserListView(mixins.ListModelMixin, generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAdminUser,
    ]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class GetUserDetailView(APIView):
    permission_classes = [
        permissions.IsAdminUser
    ]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


# UPDATE USER
class UpdateDeleteUserView(APIView):
    permission_classes = [
        IsSuperUser,
    ]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        data = request.data
        if request.user == user:
            data['is_active'] = request.user.is_active
            data['is_superuser'] = request.user.is_superuser

        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        user = self.get_object(pk)
        if request.user == user:
            return Response({"detail": "Unable to deactive yourself!"}, status=status.HTTP_403_FORBIDDEN)
        data = {"is_active": not user.is_active}
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
