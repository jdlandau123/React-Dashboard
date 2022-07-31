from django.shortcuts import render
from rest_framework import viewsets
from .models import ToDoItem
from .serializers import ToDoItemSerializer

class ToDoView(viewsets.ModelViewSet):
    serializer_class = ToDoItemSerializer
    queryset = ToDoItem.objects.all()