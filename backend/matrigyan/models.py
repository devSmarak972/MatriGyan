from django.db import models
from django.contrib.auth.models import User
import random
class Student(models.Model):
	std=models.IntegerField(default=11)
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	first_name=models.TextField(default="")
	full_name=models.TextField(default="")
	last_name=models.TextField(default="")
	totalWatchTime=models.IntegerField(default=0,null=True,blank=True)
	avgWatchTime=models.IntegerField(default=0,null=True,blank=True)
	phone=models.TextField(default="000")
	user_type=models.CharField(default="student",max_length=255)
	enrolled_course=models.ManyToManyField("Course",related_name="student_enrolled",blank=True)
	ongoing_course=models.ManyToManyField("Course",related_name="student_ongoing",blank=True)
	# attempted_test=models.ManyToManyField("QuizResponse",related_name="student_attempted",blank=True)
	test=models.ManyToManyField("Quiz",related_name="student_test",blank=True)
	task=models.ManyToManyField("Task",related_name="student_task",blank=True)
	event=models.ManyToManyField("Event",related_name="student_event",blank=True)
	live_class=models.ManyToManyField("ClassModel",related_name="student_live",blank=True)
	def __str__(self) -> str:
			return self.full_name
	@property
	def avgTestScore(self):
		return (int)(random.random()*100+10)
class Educator(models.Model):
	name=models.CharField(max_length=255)
	# std=models.IntegerField(default=11)
	profile_pic = models.CharField(max_length=200, null=True, blank=True)
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	taughtTime=models.IntegerField(default=0,blank=True)
	task=models.ManyToManyField("Task",related_name="educator_task",blank=True)
	
	def __str__(self) -> str:
		return self.name
	@property
	def numStudents(self):
		return sum([el.ongoing for el in self.course_set.all()])
	@property
	def rating(self):
		return sum([el.rating for el in self.course_set.all()])
	@property
	def numTests(self):
		return len(self.quiz_set.all())
	@property
	def feedbacks(self):
		# courses=self.course_set.all()
		feedbacks=Feedback.objects.filter(course__educator=self.id)
		return feedbacks
class Video(models.Model):
	title=models.TextField(default="",blank=True)
	url=models.TextField(default="",blank=True)
	duration=models.IntegerField(default=0)#in mins
	section=models.ForeignKey("CourseSection",blank=True,on_delete=models.CASCADE)
	def __str__(self):
		return self.url
# Create your models here.
class CourseSection(models.Model):
	# course=models.ForeignKey("Course",on_delete=models.CASCADE, null=True, blank=True)
	title=models.CharField(default="",max_length=255)
	# duration=models.IntegerField(default=0,null=True,blank=True)
	order_id=models.IntegerField(default=1)
	course=models.ForeignKey("Course",blank=True,on_delete=models.CASCADE,null=True)
	
	@property
	def duration(self):
		return sum([el.duration for el in self.video_set.all()])
	@property
	def videos(self):
		return self.video_set.all()
	def __str__(self) -> str:
		   return self.title+"_"+str(self.order_id)

	
	# def videos(self):
	# 	return self.video_set.all()
 
class CourseCategory(models.Model):
	category=models.CharField(default="",unique=False,max_length=255)
	def __str__(self):
		  return str(self.category)

class CourseTag(models.Model):
	tagname=models.CharField(default="",unique=False,max_length=255)
   
	def __str__(self):
		  return self.tagname

class Comment(models.Model):
	user=models.ForeignKey(Student,on_delete=models.CASCADE, null=True, blank=True)
	comment=models.TextField()
	date_time=models.DateTimeField( auto_now=True)
	likes=models.IntegerField(default=0)
	video=models.IntegerField(default=1,blank=True)
	course=models.ForeignKey("Course",on_delete=models.CASCADE,null=True)
	def __str__(self) -> str:
		return self.comment+"_"+str(self.date_time)
	@property
	def totalcomments(self):
		return len(self.course.comment_set.all()) 
class Feedback(models.Model):
	ratings=(
		(0,0),
		(1,1),
		(2,2),
		(3,3),
		(4,4),
		(5,5),
	)
	message=models.TextField(default="",blank=True)
	course=models.ForeignKey("Course",on_delete=models.CASCADE)
	rating=models.IntegerField(default=5,choices=ratings)
	date=models.DateTimeField(blank=True,auto_now_add=True)
	user=models.ForeignKey("Student",on_delete=models.CASCADE)
	
	def __str__(self):
		return str(self.rating)+"_"+str(self.id)

# class Educator(models.Model):
# 	name = models.CharField(max_length=250)
# 	def __str__(self):
# 		return (self.name)
	
class Option(models.Model):
	value = models.TextField()

	def __str__(self):
		return self.value

class Solution(models.Model):
	answer = models.TextField(default="")
	solution = models.TextField(blank=True,default="")
	media = models.TextField(blank=True)

	def __str__(self):
		return self.solution

class QuestionType(models.Model):
	name = models.CharField(max_length=250)

	def __str__(self):
		return self.name

class Question(models.Model):
	qnumber = models.IntegerField(default=1)
	question = models.TextField()
	type_choice = (
		('MULTIPLE','Multiple'),
		('SINGLE','Single'),
		('NUMERICAL', 'Numerical'),
		('TEXT', 'Text'),
	)
	type = models.CharField(max_length=250, choices=type_choice, default='Single')
	image = models.TextField(blank=True,default="")
	options = models.ManyToManyField(Option,blank=True)
	solution = models.ForeignKey(Solution, on_delete=models.CASCADE, null=True, blank=True)
	marks=models.IntegerField(default=1,blank=True)
	def __str__(self):
		return str(self.qnumber) + self.question

class Quiz(models.Model):
	name = models.CharField(max_length=250)
	topic = models.CharField(max_length=250)
	subject = models.CharField(max_length=250)
	creator = models.ForeignKey(Educator, on_delete=models.CASCADE, null=True, blank=True)
	questions = models.ManyToManyField(Question,blank=True)
	time=models.IntegerField(default=1,blank=True)
	def __str__(self):
		return (self.topic + self.subject)
	@property
	def number_of_questions(self):
		return len(self.questions.all())
	@property
	def total_marks(self):
		return sum([el.marks for el in self.questions.all()])
class QuizResponse(models.Model):
	quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE)
	educator_feedback=models.TextField(default="",blank=True)
	student=models.ForeignKey(Student,on_delete=models.CASCADE,blank=True,null=True)
	def __str__(self):
		return (self.quiz.name + self.student.full_name)
	def obtained_marks(self):
		return sum([el.marks for el in self.quizanswer_set.all()])
	
		
class QuizAnswer(models.Model):
	question=models.ForeignKey(Question,on_delete=models.CASCADE)
	answer=models.TextField(default="",blank=True)
	response=models.ForeignKey(QuizResponse,on_delete=models.CASCADE,blank=True)
	marks=models.IntegerField(default=0,blank=True)
	def __str__(self):
		return (self.question + self.response.student_test.all().fullname)
	
		

class Task(models.Model):
	name = models.CharField(max_length=250)
	user=models.ForeignKey(User,on_delete=models.CASCADE)
	due_date=models.DateTimeField(auto_now_add=True)
	completed=models.BooleanField(default=False,blank=True)
	def __str__(self):
		return (self.name + self.user.username)


class Course(models.Model):
	
	title=models.CharField(default="",max_length=255)
	# rating=models.IntegerChoices(default=0,choices=[0,1,2,3,4,5])
	# duration=models.IntegerField(default=0,blank=True,null=True)
	description=models.TextField(default="",blank=True,null=True)#received as html
	# sections=models.ManyToManyField("CourseSection",blank=True)
	category=models.ManyToManyField("CourseCategory",blank=True)
	tags=models.ManyToManyField("CourseTag",blank=True)
	image = models.TextField(default="",null=True, blank=True)
	quizes = models.ManyToManyField(Quiz,blank=True)
	# comments = models.ManyToManyField(Comment,blank=True)
	educator=models.ForeignKey("Educator",on_delete=models.CASCADE,null=True,blank=True)
	def __str__(self):
		return self.title
	@property
	def rating(self):
		feedbacks=self.feedback_set.all()
		print(feedbacks)
		if len(feedbacks)==0:
			return 0
		ratingsum=sum([el.rating for el in feedbacks])
		return ratingsum/len(feedbacks)
	@property
	def sections(self):
		return self.coursesection_set.all()
	@property
	def enrolled(self):
		return len(self.student_enrolled.all())
	@property
	def duration(self):
		dur=sum([el.duration for el in self.sections.all()])
		print(dur,"sum")
		return dur
	@property
	def ongoing(self):
		return len(self.student_ongoing.all())
	@property
	def comments(self):
		return self.comment_set.all()
	

# class LiveClass(models.Model):
	
# 	title=models.CharField(default="",max_length=255)
# 	educator=models.ForeignKey("Educator",on_delete=models.CASCADE)
# 	# rating=models.IntegerChoices(default=0,choices=[0,1,2,3,4,5])
# 	# duration=models.IntegerField(default=0,blank=True,null=True)
# 	description=models.TextField(default="",blank=True,null=True)#received as html
# 	category=models.ManyToManyField("CourseCategory")
# 	tags=models.ManyToManyField("CourseTag")
# 	image = models.TextField(null=True, blank=True)
# 	# educator=models.ForeignKey("Educator",on_delete=models.CASCADE)
# 	def __str__(self):
# 		return self.title


class Notifications(models.Model):
	message=models.TextField()
	date_time=models.DateTimeField(auto_now=True)
	title=models.CharField(default="",max_length=255)
	def __str__(self) -> str:
		return self.title+"_"+str(self.id)

class ClassModel(models.Model):
	title=models.CharField(default="",max_length=255)
	# students=models.ManyToManyField(Student)
	modes=((0,"English"),(1,"Hindi"))
	mode=models.IntegerField(default=0,choices=modes)
	teacher=models.ForeignKey("Educator",on_delete=models.CASCADE, null=True, blank=True)
	start=models.DateTimeField(auto_created=True)
	end=models.DateTimeField(auto_created=True)
	tags=models.ManyToManyField("CourseTag",blank=True)

	def __str__(self):
		return self.title+"_"+str(self.id)
	
	@property
	def duration(self):
		return "16h"

# class Educator(models.Model):
# 	name = models.CharField(max_length=250)
# 	def __str__(self):
# 		return (self.name)
	
# class Option(models.Model):
# 	value = models.TextField()

# 	def __str__(self):
# 		return self.value

# class Solution(models.Model):
# 	solution = models.TextField()
# 	media = models.TextField()

# 	def __str__(self):
# 		return self.solution

# class QuestionType(models.Model):
# 	name = models.CharField(max_length=250)

# 	def __str__(self):
# 		return self.name

# class Question(models.Model):
# 	qnumber = models.IntegerField(default=1)
# 	question = models.TextField()
# 	type_choice = (
# 		('MULTIPLE','Multiple'),
# 		('SINGLE','Single'),
# 		('NUMERICAL', 'Numerical'),
# 		('TEXT', 'Text'),
# 	)
# 	type = models.CharField(max_length=250, choices=type_choice, default='Single')
# 	image = models.TextField()
# 	options = models.ManyToManyField(Option)
# 	solution = models.ForeignKey(Solution, on_delete=models.CASCADE, null=True, blank=True)
	
# 	def __str__(self):
# 		return str(self.qnumber) + self.question

# class Quiz(models.Model):
# 	name = models.CharField(max_length=250)
# 	topic = models.CharField(max_length=250)
# 	subject = models.CharField(max_length=250)
# 	creator = models.ForeignKey(Educator, on_delete=models.CASCADE, null=True, blank=True)
# 	questions = models.ManyToManyField(Question)

# 	def __str__(self):
# 		return (self.topic + self.subject)

class Event(models.Model):
	title = models.CharField(max_length=250, blank=True, null=True)
	types = (
		('RECURRING','Recurring'),
		('MULTIDAY', 'Multiday'),
		('SINGLE', 'Single Day')
	)
	type = models.CharField(max_length=250, choices=types,default='SINGLE')
	startRecur = models.DateField(null=True, blank=True)
	endRecur = models.DateField(null=True, blank=True)
	startTime = models.TimeField(null=True, blank=True)
	endTime = models.TimeField(blank=True, null=True)
	daysOfWeek = models.TextField(blank=True , null=True)
	user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
 
 
class Resource(models.Model):
	image=models.TextField(default="",blank=True)
	description=models.TextField(default="",blank=True)
	title=models.TextField(default="",blank=True)
	file_url=models.TextField(default="",blank=True)
	creator=models.ForeignKey("Educator",on_delete=models.CASCADE,blank=True)
	def __str__(self):
		 return self.creator.id+"_"+self.title     