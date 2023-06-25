
from django.contrib import admin
from django.urls import path,include
from .views import CourseApi,login_user,register_user,logout_user
from rest_framework_simplejwt import views as jwt_views
urlpatterns = [
    # path('admin/',),
    path('v1/course/',CourseApi.as_view(), name="courseapis"),
    # path('v1/delete_linkage/', views.delete_linkage,name="delete_linkage"),
    path('api/login/email', login_user, name='user login'),
    path('api/register/email', register_user, name='user registration'),
    path('api/logout', logout_user, name='user logout'),
 
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

]
