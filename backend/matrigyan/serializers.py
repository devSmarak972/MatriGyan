# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import Course

# Create a model serializer
class CourseSerializer(serializers.ModelSerializer):
	# specify model and fields
	class Meta:
		model = Course
		fields = ('title', 'description','category','tags')
