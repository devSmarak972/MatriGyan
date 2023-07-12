from django.shortcuts import render,redirect
# coding: utf-8
from django.template.loader import get_template
from django.http import HttpResponseRedirect, HttpResponse, HttpResponsePermanentRedirect,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from backend.settings import FRONTEND_URL
import random, string
from django.contrib.auth import logout
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

from .models import Course,CourseCategory,CourseSection,Comment,CourseTag,Student,Educator
from .common import update_first_and_last_name
import json
from .models import *
from .serializers import *
# Create your views here.
# from .serializers import CourseSerializer
import backend.settings as matrigyan_settings


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

@csrf_exempt
def login_user(request):
	authentic_user =  request.user.is_authenticated
	print(request.user)
	if authentic_user:
		return HttpResponse(json.dumps({'redirect': True}), content_type="application/json")
	data = check_to_login_registered_user(request)
	response = JsonResponse(
		data
	)
	
	response["Access-Control-Allow-Origin"] = "http://localhost:3000"
	response["Access-Control-Allow-Methods"] = "*"
	response["Access-Control-Max-Age"] = "1000"
	response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
	return response
	# return HttpResponse(json.dumps(data), content_type="application/json")

def check_to_login_registered_user(request):
	# print("data",request.body)
	data=json.loads(request.body)["data"]
	# print("data",data)
	email = data.get('email', '')
	password = data.get('password', '')
	email = email.lower().strip()
	user = User.objects.filter(email__iexact=email)
	# to login with username
	if not user:
		user = User.objects.filter(username=email)
	# if user:
	#    check_to_set_dummy_password(user.first())
	if not user.exists():
		msg = 'This email is not registered with us.'
		return {"message": msg, "redirect": False, "success": False}
	elif not user.first().check_password(password):
		msg = "Username or password is incorrect. Please check and try again."
		return {"message": msg, "redirect": False, "success": False}
	else:
		username = user.first().username
	auth_user = authenticate(username=username, password=password)
	utype="undefined"
	if auth_user is not None:
		if auth_user.is_active:
			login(request, auth_user)
			msg = "Signed in successfully!"
			redirect = True
			request.session.set_expiry(matrigyan_settings.KEEP_LOGGED_DURATION)
			educator=Educator.objects.filter(user=auth_user.id).first()
			student=Student.objects.filter(user=auth_user.id).first()
			if educator:
				utype="educator"
			elif student:
				utype="student"
				 
		else:
			msg = 'The user is disabled!'
			redirect = False
	else:
		msg = 'Invalid login'
		redirect = False
	return {"message": msg, "redirect": redirect, "success": redirect, "user_id": user.first().id,"utype":utype}

def logout_user(request, app_type=None):
   
		logout(request)
		return_dict = {'success': True}
		return JsonResponse(return_dict)

def generate_username(email, first_name, last_name):
	# print(email)
	if first_name or last_name:
		username = first_name + last_name
	else:
		username = email
	username = username[:30]
	if not User.objects.filter(username=username).exists():
		return username
	username_exists = True
	# print(username_exists)
	username = username[:25]
	while username_exists:
		username = username + ''.join(random.choice(string.ascii_letters) for i in range(5))
		username_exists = User.objects.filter(username=username).exists()
	
	print(username,"\n\n\n")
	return username


@csrf_exempt
def register_user(request):
	authentic_user = False & request.user.is_authenticated
	if authentic_user:
		return HttpResponse(json.dumps({'redirect': True}), content_type="application/json")
	# This flag decides if the client registered will be made freelance client or not
	# print(json.loads(request.body))
	data=json.loads(request.body)["data"]
	print(data)
	email = data.get('email', '')
	password = data.get('password', '')
	first_name = data.get('firstname', '')
	last_name = data.get('lastname', '')
	phone = data.get('phone', '')
	std = data.get('class', '')
	exam = data.get('exam', '')
	city = data.get('city', '')
	state = data.get('state', '')
	country = data.get('country', '')
	zipcode = data.get('zipcode', '')
	user = User.objects.filter(email__iexact=email)
	if user.exists():
		msg = 'The email is already registered with us.'
		return HttpResponse(json.dumps({"message": msg, "redirect": False}), content_type="application/json")
	first_name = first_name.lower().strip() if first_name else ''
	last_name = last_name.lower().strip() if last_name else ''
	email = email.lower().strip()
	print(user,email,password,first_name,"data")
	username = generate_username(email, first_name, last_name)
	user = User.objects.create_user(username, email, password)
	print(user)
	auth_user = authenticate(username=username, password=password)
	if auth_user is not None:
		if auth_user.is_active:
			login(request, auth_user)
			msg = []
			redirect = True
		else:
			msg = 'The user is disabled!'
			redirect = False
	else:
		msg = 'Invalid login'
		redirect = False
	if redirect:
			email = create_student(auth_user, first_name, last_name, email, phone,password, 
			city, state, country, zipcode)
			return HttpResponse(json.dumps({"message": "Account created successfully!","username":username ,"redirect": redirect, "success": redirect, "user_id": user.id}), content_type="application/json")
	return HttpResponse(json.dumps({"message": msg, "redirect": redirect}), content_type="application/json")


def create_student(user, first_name, last_name, email, phone, password, city="", state="", 
	country="", zipcode="", user_type='student'):
	guser = Student.objects.filter(user=user).first()
	guser_created = False
	if not guser:
		guser = Student()
		guser.user = user
		guser.user_type = user_type
		guser_created = True
	guser.email = email

	if phone:
		guser.phone = phone
	first_name = first_name.title().strip()
	last_name = last_name.title().strip()
	guser.first_name = first_name
	guser.last_name = last_name
	
	# save full name
	guser.full_name = first_name + " " + last_name
	# guser.client_code = create_client_code(first_name, last_name)
	# guser.freelance = freelance
	# guser.content_type = content_type
	guser.save()

	# save user address if provided
	# save_guser_address(guser, street_address, city, state, country, zipcode)
	# if guser_created:
		# send welcome email on signup/create client
		# try:

		#     if user_type == "client":
		#         if not cws_reg:
		#             send_freelance_client_welcome_email(guser)
		#         else:
		#             # TBD: CWS welcome email
		#             pass
		# except Exception as e:
		#     # print(e)
		#     pass
	# update first name and last name to User model
	update_first_and_last_name(guser)
	return guser.email

@api_view(['GET'])
def getTags(request):
	tags = CourseTag.objects.all()
	serializer = CourseTagSerializer(tags, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def addTag(request, id):
	s = CourseTagSerializer(data=request.data)
	course = Course.objects.get(id=id)
	if s.is_valid():
		s = s.data
		new = s['tagname'].lower()
		exists = CourseTag.objects.filter(tagname=new).first()
		if exists==None:
			new_tag = CourseTag(tagname=new)
			new_tag.save()
			course.tags.add(new_tag)
			return Response({"success":True,"tag":new_tag.tagname,"message":"New unique tag was added!"})
		else:
			course.tags.add(exists)
			return Response({"success":True,"tag":exists.tagname,"message":"Old tag was added!"})
	else:
		return Response({"success":False,"message":"Invalid!"})
	
@api_view(['GET'])
def getCommentCourse(request,id):
	course = Course.objects.get(id=id)
	comments=course.comments.all()
	sc = CommentSerializer(comments, many=True)
	return Response(sc.data)
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
	print(course,s)
	if s.is_valid():
		s = s.data
		new = s['category'].lower()
		exists = CourseCategory.objects.filter(category=new).first()
		if exists==None:
			new_category = CourseCategory(category=new)
			new_category.save()
			course.category.add(new_category)
			return Response({"success":True,"category":new_category.category,"message":"New unique category was added!"})
		else:   
			course.category.add(exists)
			return Response({"success":True,"category":exists.category,"message":"Old category added!"})
	else:
		return Response({"success":False,"message":"Not valid!"})
	
@api_view(['POST'])
def editCourse(request,id):
	course = Course.objects.get(id=id)
	courses = CourseSerializer(instance=course,data=request.data)
	if courses.is_valid():
		courses.save()
		return Response({"message":"Course edited!","course":courses.data,"success":True})
	return Response({"success":False,"message":"Invalid"})

@api_view(['GET'])
def getCourses(request):
	# student=Student.objects.filter()
	courses = Course.objects.all()
	courseserializer = CourseSerializer(courses, many=True)
	return Response({"success":True,"data":courseserializer.data})

@api_view(['GET'])
def getCourse(request, id):
	course = Course.objects.get(id=id)
	students=course.student_enrolled.all().values_list("user")
	enrolled=False
	# sections=course.coursesection_set.all()
	# sections=SectionSerializer(sections,many=True)
	# print(request.user,list(students))
	# student=Student.objects.get(user=request.user)
	
	if (request.user.id,) in list(students):
		enrolled=True
		print("enrolled")
	c = CourseSerializer(course, many=False)
	return Response({"data":c.data,"isEnrolled":enrolled})
@api_view(['GET'])
def getEducatorDashData(request):
	print(request.user)
	educator=Educator.objects.filter(user=request.user.id).first()
	if( not educator):
		student=Student.objects.filter(user=request.user.id).first()
		if not student:
			return Response({"success":False,"message":"Not educator","code":1})
		else:
			return Response({"success":False,"message":"Student","code":2})
		 
	# educator=Student.objects.filter(user=request.user.id).first()
	
	print(educator)
	courses=educator.course_set.all()
	classes=educator.classmodel_set.all()
	courses = CourseSerializer(courses, many=True)
	tasks=educator.task.all()
	tasks=TaskSerializer(tasks,many=True)
	comments=Comment.objects.filter(course__educator=educator.id)
	comments=CommentSerializer(comments,many=True)
	classes = ClassModelSerializer(classes, many=True)
	# tests=Quiz.objects
	tests=educator.quiz_set.all()
	# tests=QuizSerializer(tests,many=True)
	feedbacks=educator.feedbacks
	# feedbacks=[]
	feedbacks=FeedbackSerializer(feedbacks, many=True)
	
	# print(feedbacks)
	# response = Response({"name":student.first_name,"id":student.id,"avgTestScore":student.avgTestScore,"enrolled_courses":mycourses.data,"on_courses":on_courses.data,"totalWatchTime":student.totalWatchTime,"avgWatchTime":student.avgWatchTime,"attempted_tests":att_tests.data,"my_tests":tests.data,"live_classes":live_classes.data,"tasks":tasks.data,"events":events.data})
	response=Response({"success":True,"tasks":tasks.data,"watchTime":321,"numTests":len(tests),"taughtTime":educator.taughtTime,"rating":educator.rating,"numTests":educator.numTests,"numStudents":educator.numStudents,"courses":courses.data,"comments":comments.data,"classes":classes.data,"feedback":feedbacks.data})
	response["Access-Control-Allow-Origin"] = "http://localhost:3000"
	response["Access-Control-Allow-Methods"] = "*"
	response["Access-Control-Max-Age"] = "1000"
	response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
	return response
@api_view(['GET'])
def getStudentDashData(request):
	print(request.user)
	student=Student.objects.filter(user=request.user.id).first()
	if( not student):
		educator=Educator.objects.filter(user=request.user.id).first()
		if not educator:
			return Response({"success":False,"message":"Not educator","code":1})
		else:
			return Response({"success":False,"message":"Student","code":2})
		 # educator=Student.objects.filter(user=request.user.id).first()
	
	print(student)
	
	mycourses=student.enrolled_course.all()
	on_courses=student.ongoing_course.all()
	att_tests=student.quizresponse_set.all()
	tests=student.test.all()
	tasks=student.task.all()
	events=student.event.all()
	live_classes=student.live_class.all()
	# print(mycourses.first().sections.all())
	# user=User.objects.get()
	# course = Course.objects.all()
	mycourses = CourseSerializer(mycourses, many=True)
	on_courses = CourseSerializer(on_courses, many=True)
	# mycourses=mycourses.values_list()
	# on_courses=on_courses.values_list()
	# att_tests=att_tests.values_list()
	att_tests = QuizResponseSerializer(att_tests, many=True)
	tests = QuizSerializer(tests, many=True)
	# tests=tests.values_list()
	tasks = TaskSerializer(tasks, many=True)
	events = EventSerializer(events, many=True)
	live_classes = ClassModelSerializer(live_classes, many=True)
	# print(mycourses.data,on_courses.data,att_tests.data,tests.data,tasks.data)
	response = Response({"success":True,"name":student.first_name,"id":student.id,"avgTestScore":student.avgTestScore,"enrolled_courses":mycourses.data,"on_courses":on_courses.data,"totalWatchTime":student.totalWatchTime,"avgWatchTime":student.avgWatchTime,"attempted_tests":att_tests.data,"my_tests":tests.data,"live_classes":live_classes.data,"tasks":tasks.data,"events":events.data})
	# response=Response({})
	response["Access-Control-Allow-Origin"] = "http://localhost:3000"
	response["Access-Control-Allow-Methods"] = "*"
	response["Access-Control-Max-Age"] = "1000"
	response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
	return response
	# return Response(c.data)

@api_view(['DELETE'])
def deleteCourse(request, id):
	course = Course.objects.get(id=id)
	course.delete()
	return Response("Course deleted!")

@api_view(['POST'])
def addCourse(request):
	# print(request.data)
	course = CourseSerializer(data=request.data)
	# print(course.data)
	if course.is_valid():
		course.save()
		return Response({"success":True,"message":"Course Created","course":course.data})
	return Response({"success":False,"message":"Invalid input","errors":course.errors})

@api_view(['GET'])
def getSections(request, id):
	sections = CourseSection.objects.filter(course__id=id)
	if sections!=None:
		serialized_section = SectionSerializer(sections, many=True)
		return Response(serialized_section.data)
	else:
		return Response("No sections available!")
@api_view(['GET'])
def enrollCourse(request, id):
	student=Student.objects.get(user=request.user)
	if not student:
			return Response({"success":False,"message":"Not logged in"})

	course = Course.objects.filter(id=id).first()

	if course!=None:
		student.enrolled_course.add(course)
		student.save()
			
		# serialized_section = SectionSerializer(sections, many=True)
		return Response({"success":True,"message":"course added successfully","isEnrolled":True})
	else:
		return Response({"success":False,"message":"The course is not available"})

@api_view(['POST'])
def addSection(request, id):
	course = Course.objects.get(id=id)
	sec = SectionSerializer(data=request.data)
	if sec.is_valid():
		title = sec.data['title']
		# duration = int(sec.data['duration'])
		order_id = int(sec.data['order_id'])
		course_id = id
		section = CourseSection(course_id=course_id,title=title, order_id=order_id)
		section.save()
		# course.sections.add(section)
		return Response("Section added!")
	return Response("Invalid")

@api_view(['POST'])
def addVideo(request,course_id):
	print(request.data["order_id"])
	course_section = CourseSection.objects.get(course_id=course_id,order_id=request.data["order_id"])
	creator=course_section.course.educator
	print(creator)
	data=request.data.copy()
	data["section"]=course_section.id
	print(data,request.data)
	video = VideoSerializer(data=data)
	#must send the section_id with body
	if video.is_valid():
		video.save()
		return Response({"success":True,"video":video.data,"message":"video added!"})
	return Response({"Success":False,"errors":video.errors})

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
def createQuiz(request):
	quiz = QuizSerializer(data=request.data)
	if quiz.is_valid():
		quiz.save()
  
		if request.data["course_id"]:
			course = Course.objects.get(id=request.data["course_id"])
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
		question=QuestionSerializer(question)
		return Response({"question":question.data,"option_added":option_object.value,"success":True})
	return Response({"success":False,"message":"invalid data format"})

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
@api_view(['POST'])
def addQuizResponse(request,student_id,quiz_id):
	qresponse=QuizResponse.objects.filter(quiz_id=quiz_id,student_id=student_id).first()
	if qresponse:
		return Response({"success":False,"message":"Response to this quiz already exists"})
	qresponse = QuizResponseSerializer(data=request.data)
	ans=request.data["answers"]
	
	# print(course.data)
	if qresponse.is_valid():
		qresponse.save()
		print(qresponse.data)
		qanswers=QuizAnswerSerializer(context={"response":qresponse.data["id"]},data=request.data["answers"],many=True)
		if qanswers.is_valid():
			qanswers.save()
			# qanswers.update()
			print(qanswers.data)
			return Response({"success":True,"message":"Quiz Response Created","response":qresponse.data,"answers":qanswers.data})
		return Response({"success":False,"message":"Quiz Response Created, Failed to set answers","response":qresponse.data})
			
	return Response({"success":False,"message":"Invalid input"})
@api_view(['GET'])
def getQuizResponse(request,quiz_id,student_id):
	qresponse=QuizResponse.objects.filter(quiz_id=quiz_id,student_id=student_id).first()
	if not qresponse:
		return Response({"success":False,"message":"Quiz not attempted!"})

	qanswers=QuizAnswer.objects.filter(response_id=qresponse.id)
	qresponse = QuizResponseSerializer(qresponse)
	qanswers=QuizAnswerSerializer(qanswers,many=True)
	return Response({"success":True,"message":"Quiz Response Found","response":qresponse.data,"answers":qanswers.data})
