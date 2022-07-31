from django.contrib import admin
from .models import ToDoItem

class TodoAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "complete")
 

admin.site.register(ToDoItem,TodoAdmin)