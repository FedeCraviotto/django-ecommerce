from django.contrib import admin
from .models import Customer

# Le damos acceso al modelo Customer a nuestro admin panel 
admin.site.register(Customer)