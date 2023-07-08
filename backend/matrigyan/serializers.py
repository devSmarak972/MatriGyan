# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import *

# Create a model serializer			
class CourseSerializer(serializers.ModelSerializer):
	# specify model and fields
	class Meta:
		model = Course
		fields = "__all__"

class TagSerializer(serializers.ModelSerializer):
	class Meta:
		model = CourseTag
		fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = "__all__"

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

class QuizSerializer(serializers.ModelSerializer):
	class Meta:
		model = Quiz
		fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Question
		fields = "__all__"

class SolutionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Solution
		fields = "__all__"

class OptionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Option
		fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
	class Meta:
		model = Event
		fields = "__all__"