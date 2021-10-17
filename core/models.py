from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Person(models.Model):
    id              = models.AutoField(primary_key=True)
    user            = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number    = models.CharField(max_length=12)
    birthday        = models.DateTimeField(default=timezone.now())
    adress          = models.TextField()

