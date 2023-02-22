from django.contrib import admin
from .models import Customer, Address, PaymentMethod, Order

# Le damos acceso a los modelos a nuestro admin panel 
admin.site.register(Customer)
admin.site.register(Address)
admin.site.register(PaymentMethod)
admin.site.register(Order)