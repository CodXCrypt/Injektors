from django.db import models

class Author(models.Model):
    user_name = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=20)
    
    def __str__(self):
        return self.user_name
