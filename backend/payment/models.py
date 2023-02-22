from django.db import models

class Customer(models.Model):
    first_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    customer_id = models.CharField(max_length=255, unique=True)
    
    def __str__(self):
        return self.email

class Address(models.Model):
    # If I delete the customer, addresses related to it will cascade
    custom = models.ForeignKey(Customer, on_delete=models.CASCADE)
    # In braintree, addresses id will be 2 chars long
    address_id = models.CharField(max_length=2)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    state_province = models.CharField(max_length=255)
    postal_zip_code = models.CharField(max_length=9)
    
    def __str__(self):
        # Asi vamos a verlo representado en nuestro panel de admin
        return self.address_id