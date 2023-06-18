from django.db import models

class Student(models.Model):
	name=models.CharField(max_length=255)
	std=models.IntegerField(default=11)
	def __str__(self) -> str:
		return self.name
# Create your models here.
class CourseSection(models.Model):
	course=models.ForeignKey("Course",on_delete=models.CASCADE)
	title=models.CharField(default="",max_length=255)
	duration=models.IntegerField(default=0,null=True,blank=True)
	order_id=models.IntegerField(primary_key=True)
	def __str__(self) -> str:
		   return self.title+"_"+str(self.order_id)

 
class CourseCategory(models.Model):
	category=models.CharField(default="",unique=True,max_length=255)
	def __str__(self):
		  return str(self.category)

class CourseTag(models.Model):
	tagname=models.CharField(default="",unique=True,max_length=255)
   
	def __str__(self):
		  return self.tagname

class Comment(models.Model):
	user=models.ForeignKey("Student",on_delete=models.CASCADE,related_name="user")
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

class Course(models.Model):
	
	title=models.CharField(default="",max_length=255)
	# rating=models.IntegerChoices(default=0,choices=[0,1,2,3,4,5])
	# duration=models.IntegerField(default=0,blank=True,null=True)
	description=models.TextField(default="",blank=True,null=True)#received as html
	# sections=models.ForeignKey("CourseSection", on_delete=models.CASCADE)
	category=models.ManyToManyField("CourseCategory")
	tags=models.ManyToManyField("CourseTag")
	# educator=models.ForeignKey("Educator",on_delete=models.CASCADE)
	def __str__(self):
		return self.title
	@property
	def duration(self):
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

	