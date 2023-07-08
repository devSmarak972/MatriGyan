from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
	std=models.IntegerField(default=11)
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	first_name=models.TextField(default="")
	full_name=models.TextField(default="")
	last_name=models.TextField(default="")
	phone=models.TextField(default="000")
	user_type=models.CharField(default="student",max_length=255)
	def __str__(self) -> str:
		return self.name

class Educator(models.Model):
	name=models.CharField(max_length=255)
	std=models.IntegerField(default=11)
	profile_pic = models.CharField(max_length=200, null=True, blank=True)
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

	def __str__(self) -> str:
		return self.name
# Create your models here.
class CourseSection(models.Model):
	# course=models.ForeignKey("Course",on_delete=models.CASCADE, null=True, blank=True)
	title=models.CharField(default="",max_length=255)
	duration=models.IntegerField(default=0,null=True,blank=True)
	order_id=models.IntegerField(primary_key=True)
	def __str__(self) -> str:
		   return self.title+"_"+str(self.order_id)

 
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
	def __str__(self) -> str:
		return self.comment+"_"+str(self.date_time)

class Feedback(models.Model):
	ratings=(
		(0,0),
		(1,1),
		(2,2),
		(3,3),
		(4,4),
		(5,5),
	)
	message=models.TextField()
	course=models.ForeignKey("Course",on_delete=models.CASCADE)
	rating=models.IntegerField(default=5,choices=ratings)
	
	user=models.ForeignKey("Student",on_delete=models.CASCADE)
	
	def __str__(self):
		return str(self.rating)+"_"+str(self.id)

class Educator(models.Model):
	name = models.CharField(max_length=250)
	def __str__(self):
		return (self.name)
	
class Option(models.Model):
	value = models.TextField()

	def __str__(self):
		return self.value

class Solution(models.Model):
	solution = models.TextField()
	media = models.TextField()

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
	image = models.TextField()
	options = models.ManyToManyField(Option)
	solution = models.ForeignKey(Solution, on_delete=models.CASCADE, null=True, blank=True)
	
	def __str__(self):
		return str(self.qnumber) + self.question

class Quiz(models.Model):
	name = models.CharField(max_length=250)
	topic = models.CharField(max_length=250)
	subject = models.CharField(max_length=250)
	creator = models.ForeignKey(Educator, on_delete=models.CASCADE, null=True, blank=True)
	questions = models.ManyToManyField(Question)

	def __str__(self):
		return (self.topic + self.subject)

class Course(models.Model):
	
	title=models.CharField(default="",max_length=255)
	# rating=models.IntegerChoices(default=0,choices=[0,1,2,3,4,5])
	# duration=models.IntegerField(default=0,blank=True,null=True)
	description=models.TextField(default="",blank=True,null=True)#received as html
	sections=models.ManyToManyField("CourseSection")
	category=models.ManyToManyField("CourseCategory")
	tags=models.ManyToManyField("CourseTag")
	image = models.TextField(default="",null=True, blank=True)
	quizes = models.ManyToManyField(Quiz)
	comments = models.ManyToManyField(Comment)
	# educator=models.ForeignKey("Educator",on_delete=models.CASCADE)
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
	

class Notifications(models.Model):
	message=models.TextField()
	date_time=models.DateTimeField(auto_now=True)
	title=models.CharField(default="",max_length=255)
	def __str__(self) -> str:
		return self.title+"_"+str(self.id)

class ClassModel(models.Model):
	title=models.CharField(default="",max_length=255)
	students=models.ManyToManyField(Student)
	modes=((0,"English"),(1,"Hindi"))
	mode=models.TextField(default=0,choices=modes)
	teacher=models.ForeignKey("Educator",on_delete=models.CASCADE, null=True, blank=True)
	start=models.DateTimeField(auto_created=True)
	end=models.DateTimeField()
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
	type = models.CharField(max_length=250, choices=types)
	startRecur = models.DateField(null=True, blank=True)
	endRecur = models.DateField(null=True, blank=True)
	startTime = models.TimeField(null=True, blank=True)
	endTime = models.TimeField(blank=True, null=True)
	daysOfWeek = models.TextField(blank=True , null=True)
	course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.CASCADE)