# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import *

class EducatorSerializer(serializers.ModelSerializer):
	numStudents=serializers.ReadOnlyField(read_only=True)
	numTests=serializers.ReadOnlyField(read_only=True)
	rating=serializers.ReadOnlyField(read_only=True)
 	# feedbacks=FeedbackSerializer(read_only=True,many=True)

	class Meta:
		model = Educator
		fields = "__all__"
# Create a model serializer			


class StudentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Student
		fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = CourseCategory
		fields = "__all__"

class SectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = CourseSection
		fields = "__all__"
class CourseTagSerializer(serializers.ModelSerializer):
	class Meta:
		model = CourseTag
		fields = ("tagname",)
  
class OptionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Option
		fields = "__all__"
class SolutionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Solution
		fields = "__all__"
class QuestionSerializer(serializers.ModelSerializer):
	options=OptionSerializer(many=True,read_only=True)
	solution=SolutionSerializer(read_only=True)
	class Meta:
		model = Question
		fields = "__all__"
  

class QuizSerializer(serializers.ModelSerializer):
	# questions=serializers.RelatedField(read_only=True)
	creator= EducatorSerializer(read_only=True)
	creator_id = serializers.PrimaryKeyRelatedField(queryset=Educator.objects.all(), source='creator')
	total_marks=serializers.ReadOnlyField(read_only=True)
	number_of_questions=serializers.ReadOnlyField(read_only=True)
	# questions=serializers.RelatedField(read_only=True,many=True)
	questions=QuestionSerializer(read_only=True,many=True)
	class Meta:
		model = Quiz
		fields ="__all__"
class QuizResponseSerializer(serializers.ModelSerializer):
	quiz=QuizSerializer(read_only=True)
	quiz_id=serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all(), source='quiz')

	obtained_marks=serializers.ReadOnlyField(read_only=True)
	class Meta:
		model = QuizResponse
		fields = "__all__"
class QuizAnswerSerializer(serializers.ModelSerializer):
	question=QuestionSerializer(read_only=True)
	question_id=serializers.PrimaryKeyRelatedField(queryset=Question.objects.all(), source='question')
	class Meta:
		model = QuizAnswer
		fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
	user=StudentSerializer(read_only=True)
	# course=CourseSerializer(read_only=True)
	totalcomments=serializers.ReadOnlyField(read_only=True)
	class Meta:
		model = Comment
		fields = "__all__"
  
class CourseSerializer(serializers.ModelSerializer):
	# specify model and fields
	sections=SectionSerializer(read_only=True,many=True)
	category=CategorySerializer(many=True)
	tags=CourseTagSerializer(many=True)
	educator= EducatorSerializer(read_only=True)
	educator_id = serializers.PrimaryKeyRelatedField(queryset=Educator.objects.all(), source='educator')
	
	# educator=serializers.RelatedField(queryset=Educator.objects.all())
	quizes=QuizSerializer(many=True,read_only=True)
	comments=CommentSerializer(read_only=True,many=True)
	rating=serializers.ReadOnlyField(read_only=True)
	enrolled=serializers.ReadOnlyField(read_only=True)
	ongoing=serializers.ReadOnlyField(read_only=True)
	duration=serializers.ReadOnlyField(read_only=True)
	class Meta:
		model = Course
		fields = "__all__"



class FeedbackSerializer(serializers.ModelSerializer):
	course=CourseSerializer(read_only=True)
 
	user=StudentSerializer(read_only=True)
	# user_id=serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source='user')
	class Meta:
		model = Feedback
		fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
	class Meta:
		model = Event
		fields = "__all__"
class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields = "__all__"
class ClassModelSerializer(serializers.ModelSerializer):
	teacher=EducatorSerializer(read_only=True)
	tags=CourseTagSerializer(read_only=True,many=True)
	class Meta:
		model = ClassModel
		fields = "__all__"