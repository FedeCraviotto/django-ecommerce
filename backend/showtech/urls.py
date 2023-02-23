from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
#re_path for regular expressions path

urlpatterns = [
    path('api/payment/', include('payment.urls')),
    path('admin/', admin.site.urls),
]