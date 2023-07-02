from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Course)
admin.site.register(CourseCategory)
admin.site.register(CourseSection)
admin.site.register(CourseTag)
admin.site.register(Feedback)
admin.site.register(Comment)
admin.site.register(Student)
admin.site.register(Educator)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Solution)