from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Sighting(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    lat = models.DecimalField(max_digits=11, decimal_places=8, blank=False)
    lng = models.DecimalField(max_digits=11, decimal_places=8, blank=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    sight_time = models.DateField(auto_now=False,auto_now_add=False, blank=False)
    description = models.CharField(max_length=100)
    contact = models.CharField(max_length=50)
    image = models.ImageField(null=True, blank=True, upload_to="images/")

    def serialize(self):
        return {
            "author": self.author.id,
            "lat": self.lat,
            "lng": self.lng,
            "time": self.sight_time,
            "desc": self.description,
            "contact": self.contact,
            "image": self.image.url
        }

    def __str__(self):
        return f"{self.author}'s sighting"


class Missing(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False)
    lat = models.DecimalField(max_digits=11, decimal_places=8,blank=False)
    lng = models.DecimalField(max_digits=11, decimal_places=8, blank=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    missing_time = models.DateField(auto_now=False,auto_now_add=False, blank=False)
    description = models.CharField(max_length=100)
    contact = models.CharField(max_length=50)
    image = models.ImageField(null=True, blank=True, upload_to="images/")

    def serialize(self):
        return {
            "owner": self.owner.id,
            "name": self.name,
            "lat": self.lat,
            "lng": self.lng,
            "time": self.missing_time,
            "desc": self.description,
            "contact": self.contact,
            "image": self.image.url
        }

    def __str__(self):
        return f"{self.owner}'s {self.name}"