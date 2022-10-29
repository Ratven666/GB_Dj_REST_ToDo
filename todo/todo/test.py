import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from users_app.views import UserCustomViewSet
from users_app.models import User


class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/users/', {'password': '123qweASD',
                                           'username': "qwewASD",
                                           "first_name": "wqe",
                                           "last_name": "sdapsodcms",
                                           "email": "qweaspacj@amcwevmwp.ru"}, format='json')
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail(self):
        user = User.objects.create(password='123qweASD',
                                     username="qwewASD",
                                     first_name="wqe",
                                     last_name="sdapsodcms",
                                     email="qweaspacj@amcwevmwp.ru")
        client = APIClient()
        response = client.get(f'/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUserViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
