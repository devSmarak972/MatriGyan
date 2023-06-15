
from django.contrib import admin
from django.urls import path,include
from .views import CourseApi
from rest_framework_simplejwt import views as jwt_views
urlpatterns = [
    # path('admin/',),
    path('v1/course/',CourseApi.as_view(), name="courseapis"),
    # path('v1/delete_linkage/', views.delete_linkage,name="delete_linkage"),

    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

]
