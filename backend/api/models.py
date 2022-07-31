from django.db import models


class ToDoItem(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50, default="New Item")
    description = models.CharField(max_length=500, null=True, blank=True)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return self.name
