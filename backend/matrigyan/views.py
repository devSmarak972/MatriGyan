from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Course,CourseCategory,CourseSection,Comment,CourseTag
# Create your views here.
from .serializers import CourseSerializer
class CourseApi(APIView):
    authentication_classes = [JWTAuthentication,TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
        permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user:
            # puser=
            data = request.GET
            courses=Course.objects.all()
            courses_ser=CourseSerializer(courses)
            print(courses_ser)
            if len(courses)==0:
                return Response({"success":False},status=status.HTTP_200_OK)
            return Response({"success":True,"courses":courses_ser},status=status.HTTP_200_OK)
                
        else:
            return Response({"msg": "Not Authorized"}, status=status.HTTP_401_UNAUTHORIZED)

