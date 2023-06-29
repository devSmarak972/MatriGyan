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

from .models import *
from .serializers import *
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

@api_view(['GET'])
def getTags(request):
    tags = CourseTag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addTag(request, id):
    s = TagSerializer(data=request.data)
    course = Course.objects.get(id=id)
    if s.is_valid():
        s = s.data
        new = s['tagname'].lower()
        exists = CourseTag.objects.filter(tagname=new).first()
        if exists==None:
            new_tag = CourseTag(tagname=new)
            new_tag.save()
            course.tags.add(new_tag)
            return Response("New unique tag was added!")
        else:
            course.tags.add(exists)
            return Response("Old tag added!")
    else:
        return Response("Not valid!")
    
@api_view(['GET'])
def getComment(request):
    comments = Comment.objects.all()
    sc = CommentSerializer(comments, many=True)
    return Response(sc.data)

@api_view(['POST'])
def addComment(request, id):
    student = Student.objects.get(id=id)
    com = CommentSerializer(data=request.data)
    if com.is_valid():
        repr(com)
        com.validated_data['user'] = student
        com.save()
        return Response(com.data)
    else:
        repr(com)
        return Response("Invalid")
    
@api_view(['GET'])
def getCategory(request):
    categories = CourseCategory.objects.all()
    cs = CategorySerializer(categories, many=True)
    return Response(cs.data)

@api_view(['POST'])
def addCategory(request, id):
    s = CategorySerializer(data=request.data)
    course = Course.objects.get(id=id)
    if s.is_valid():
        s = s.data
        new = s['category'].lower()
        exists = CourseCategory.objects.filter(category=new).first()
        if exists==None:
            new_category = CourseCategory(category=new)
            new_category.save()
            course.category.add(new_category)
            return Response("New unique category was added!")
        else:
            course.category.add(exists)
            return Response("Old category added!")
    else:
        return Response("Not valid!")
    
@api_view(['POST'])
def editCourse(request,id):
    course = Course.objects.get(id=id)
    courses = CourseSerializer(instance=course,data=request.data)
    if courses.is_valid():
        courses.save()
    return Response(courses.data)

@api_view(['GET'])
def getCourses(request):
    courses = Course.objects.all()
    courseserializer = CourseSerializer(courses, many=True)
    return Response(courseserializer.data)

@api_view(['GET'])
def getCourse(request, id):
    course = Course.objects.get(id=id)
    c = CourseSerializer(course, many=False)
    return Response(c.data)

@api_view(['DELETE'])
def deleteCourse(request, id):
    course = Course.objects.get(id=id)
    course.delete()
    return Response("Course deleted!")

@api_view(['POST'])
def addCourse(request):
    course = CourseSerializer(data=request.data)
    if course.is_valid():
        course.save()
    return Response(course.data)

@api_view(['GET'])
def getSections(request, id):
    sections = CourseSection.objects.filter(course__id=id)
    serialized_section = SectionSerializer(sections, many=True)
    return Response(serialized_section.data)

@api_view(['POST'])
def addSection(request, id):
    course = Course.objects.get(id=id)
    sec = SectionSerializer(data=request.data)
    if sec.is_valid():
        title = sec.data['title']
        duration = int(sec.data['duration'])
        order_id = int(sec.data['order_id'])
        section = CourseSection(course=course, title=title, duration=duration, order_id=order_id)
        section.save()
    return Response(sec.data)

@api_view(['DELETE'])
def deleteSection(request, id):
    section = CourseSection.objects.get(id=id)
    section.delete()
    return Response("Section deleted!")

@api_view(['GET'])
def getQuiz(request, id):
    quizes = Quiz.objects.get(id=id)
    qs = QuizSerializer(quizes, many=False)
    return Response(qs.data)

@api_view(['GET'])
def getCourseQuiz(request, id):
    course = Course.objects.get(id=id)
    quizes = course.quizes.all()
    print(quizes)
    sq = QuizSerializer(quizes, many=True)
    return Response(sq.data)

@api_view(['POST'])
def createQuiz(request):
    quiz = QuizSerializer(data=request.data)
    if quiz.is_valid():
        quiz.save()
    return Response(quiz.data)

@api_view(['DELETE'])
def deleteQuiz(request, id):
    quiz = Quiz.objects.get(id=id)
    quiz.delete()
    return Response('Quiz deleted!')

@api_view(['POST'])
def addQuestion(request, id):
    question = QuestionSerializer(data=request.data)
    if question.is_valid():
            question.save()
            que = Question.objects.get(id=question.data['id'])
            quiz = Quiz.objects.get(id=id)
            quiz.questions.add(que)
    return Response(question.data)

@api_view(['GET'])
def getQuestions(request, id):
    quiz = Quiz.objects.get(id=id)
    questions = quiz.questions.all()
    serialized_questions = QuestionSerializer(questions, many=True)
    return Response(serialized_questions.data)

@api_view(['DELETE'])
def deleteQuestion(request, id):
    question = Question.objects.get(id=id)
    question.delete()
    return Response("Question deleted!")

@api_view(['POST'])
def addSolution(request, id):
    solution = SolutionSerializer(data=request.data)
    if solution.is_valid():
        solution.save()
        question = Question.objects.get(id=id)
        question.solution = Solution.objects.get(id=solution.data['id'])
        question.save()
    return Response(solution.data)