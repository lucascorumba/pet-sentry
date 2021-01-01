from django.contrib import admin

from .models import User, Missing, Sighting

# Register your models here.

admin.site.register(User)
admin.site.register(Missing)
admin.site.register(Sighting)