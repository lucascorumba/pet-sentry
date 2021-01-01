from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("sentry", views.sentry, name="sentry"),
    path("login", views.loginView, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logoutView, name="logout"),
    path("missing", views.newMissing, name="missing"),
    path("sight", views.newSight, name="sighting")
]