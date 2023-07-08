
from django.contrib import admin
from django.urls import path,include
from .views import CourseApi
from rest_framework_simplejwt import views as jwt_views
from . import views
urlpatterns = [
    # path('admin/',),
    path('v1/course/',CourseApi.as_view(), name="courseapis"),
    # path('v1/delete_linkage/', views.delete_linkage,name="delete_linkage"),

    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('get-tags/',views.getTags),
    path('add-tag/<int:id>/', views.addTag),
    path('get-comments/', views.getComment),
    path('add-comments/<int:id>/', views.addComment),
    path('get-category/', views.getCategory),
    path('add-category/<int:id>/', views.addCategory),
    path('edit-course/<int:id>/', views.editCourse),
    path('get-courses/', views.getCourses),
    path('get-course/<int:id>/', views.getCourse),
    path('create-course/', views.addCourse),  
    path('delete-course/<int:id>/', views.deleteCourse),  
    path('get-sections/<int:id>/', views.getSections),
    path('add-section/<int:id>/', views.addSection),
    path('delete-section/<int:id>/', views.deleteSection),
    path('get-quiz/<int:id>/', views.getQuiz),
    path('get-course-quiz/<int:id>/', views.getCourseQuiz),
    path('create-quiz/', views.createQuiz),
    path('delete-quiz/<int:id>/', views.deleteQuiz),
    path('add-question/<int:id>/', views.addQuestion),
    path('get-questions/<int:id>/', views.getQuestions),
    path('delete-question/<int:id>/', views.deleteQuestion),
    path('add-solution/<int:id>/', views.addSolution),
    path('delete-solution/<int:id>/', views.deleteSolution),
    path('add-option/<int:id>/', views.addOption),
    path('get-options/<int:id>/', views.getOptions),
    path('delete-option/<int:id>/',views.deleteOption),
    path('get-events/<int:id>/', views.getEvents),
    path('add-event/<int:id>/', views.addEvent),
    path('delete-events/<int:id>/', views.deleteEvent),
]
