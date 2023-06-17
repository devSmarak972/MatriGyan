
from django.contrib import admin
from django.urls import path,include
from .views import CourseApi
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    # path('admin/',),
    path('v1/course/',CourseApi.as_view(), name="courseapis"),
    # path('v1/delete_linkage/', views.delete_linkage,name="delete_linkage"),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),

]
urlpatterns += [
    path('auth/', include('rest_framework.urls')),
]


urlpatterns += [
    path('token-auth/', obtain_auth_token, name="login"),
    path('token-auth/refresh/', RefreshAuthToken.as_view(), name="refresh-token")
]