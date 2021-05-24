from django.contrib import admin
from .models import Author


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'password')

admin.site.register(Author, AuthorAdmin)
