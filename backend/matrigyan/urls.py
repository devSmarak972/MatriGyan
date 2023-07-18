
from django.contrib import admin
from django.urls import path,include
from .views import CourseApi,login_user,register_user,logout_user
from rest_framework_simplejwt import views as jwt_views
from . import views
urlpatterns = [
    # path('admin/',),
    path('v1/course/',CourseApi.as_view(), name="courseapis"),
    # path('v1/delete_linkage/', views.delete_linkage,name="delete_linkage"),
    path('api/login/email', login_user, name='user login'),
    path('api/register/email', register_user, name='user registration'),
    path('api/logout', logout_user, name='user logout'),
 
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('get-tags/',views.getTags),
    path('add-tag/<int:id>/', views.addTag),
    path('get-comments/', views.getComment),
    path('add-comments/<int:id>/', views.addComment),
    path('get-comments/<int:id>/', views.getCommentCourse),
    path('get-category/', views.getCategory),
    path('add-category/<int:id>/', views.addCategory),
    path('add-video/<int:course_id>/', views.addVideo),
    path('delete_video/<int:id>', views.deleteVideo),
    path('add-task/', views.addTask),
    path('edit-task/<int:id>', views.editTask),
    path('update-task-status/<int:id>', views.ChangeTaskStatus),
    path('add-quiz-response/<int:quiz_id>/', views.addQuizResponse),
    path('get-quiz-response/<int:quiz_id>/', views.getQuizResponse),
    path('edit-course/<int:id>/', views.editCourse),
    path('edit-quiz/<int:id>/', views.editQuiz),
    path('edit-question/<int:id>/', views.editQuestion),
    path('set-question-order/<int:id>/', views.editQuestionOrder),
    path('edit-solution/<int:id>/', views.editSolution),
    path('get-courses/', views.getCourses),
    path('enroll-course/<int:id>/', views.enrollCourse),
    path('educator-dashboard-data/', views.getEducatorDashData),
    path('student-dashboard-data/', views.getStudentDashData),
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
    path('get-resources/', views.getResources),
    path('educator-resource/<int:id>/', views.getEducatorResource),
    path('get-resource/<int:id>/', views.getParticularResource),
    path('add-resource/<int:id>/', views.addResource),
    path('delete-resource/<int:id>/', views.deleteResource),
    path('get-user/', views.getUser),
    path('get-educators/', views.getEducators),
    path('get-educator/<int:id>/', views.getEducator),
    path('edit-student/<int:id>/', views.editStudent),
    path('edit-educator/<int:id>/', views.editEducator),
    path('search-courses/', views.searchCourses),
]
