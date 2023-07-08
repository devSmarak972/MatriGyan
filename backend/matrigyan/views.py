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
import json
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
    student = Student.objects.get(id=request.user.id)
    com = CommentSerializer(data=request.data)
    if com.is_valid():
        com.validated_data['user'] = student
        com.save()
        course = Course.objects.get(id=id)
        course.comments.add(com)
        return Response("Comment added!")
    else:
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
        return Response("Course edited!")
    return Response("Invalid")

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
        return Response("Course updated")
    return Response("Invalid")

@api_view(['GET'])
def getSections(request, id):
    sections = CourseSection.objects.filter(course__id=id)
    if sections!=None:
        serialized_section = SectionSerializer(sections, many=True)
        return Response(serialized_section.data)
    else:
        return Response("No sections available!")

@api_view(['POST'])
def addSection(request, id):
    course = Course.objects.get(id=id)
    sec = SectionSerializer(data=request.data)
    if sec.is_valid():
        title = sec.data['title']
        duration = int(sec.data['duration'])
        order_id = int(sec.data['order_id'])
        section = CourseSection(title=title, duration=duration, order_id=order_id)
        section.save()
        course.sections.add(section)
        return Response("Section added!")
    return Response("Invalid")

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
    if quizes!=None:
        sq = QuizSerializer(quizes, many=True)
        return Response(sq.data)
    else:
        return Response("No quizes found")

@api_view(['POST'])
def createQuiz(request, id):
    quiz = QuizSerializer(data=request.data)
    course = Course.objects.get(id=id)
    if quiz.is_valid():
        quiz.save()
        course_quiz = Quiz.objects.get(id = quiz.data['id'])
        course.quizes.add(course_quiz)
        return Response("Quiz created!")
    return Response("Invalid")

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

@api_view(['DELETE'])
def deleteSolution(request, id):
    solution = Solution.objects.get(id=id)
    solution.delete()
    return Response("Solution deleted")

@api_view(['POST'])
def addOption(request, id):
    option = OptionSerializer(data=request.data)
    if option.is_valid():
        option.save()
        question = Question.objects.get(id=id)
        option_object = Option.objects.get(id=option.data['id'])
        question.options.add(option_object)
    return Response(option.data)

@api_view(['DELETE'])
def deleteOption(request, id):
    option = Option.objects.get(id=id)
    option.delete()
    return Response("Option deleted")

@api_view(['GET'])
def getOptions(request, id):
    question = Question.objects.get(id=id)
    options = question.options.all()
    option_serialized = OptionSerializer(options, many=True)
    return Response(option_serialized.data)

@api_view(['POST'])
def addEvent(request, id):
    data=request.data
    print(data['daysOfWeek'])
    daysOfWeek = json.dumps(data['daysOfWeek'])
    event = Event()
    event.title = data['title']
    event.daysOfWeek = daysOfWeek
    event.type = data['type']
    event.startRecur = data['startRecur']
    event.endRecur = data['endRecur']
    event.startTime = data['startTime']
    event.endTime = data['endTime']
    event.course = Course.objects.get(id=id)
    event.save()
    return Response(data)

@api_view(['GET'])
def getEvents(request,id):
    events = Event.objects.filter(course__id=id)
    if events!=None:
        serialized_events = EventSerializer(events, many=True)
        return Response(serialized_events.data)
    else:
        return Response("No events found")
    
@api_view(['DELETE'])
def deleteEvent(request, id):
    event = Event.objects.get(id=id)
    event.delete()
    return Response("Event deleted!")