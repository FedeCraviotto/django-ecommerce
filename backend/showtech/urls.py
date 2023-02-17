from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
#re_path for regular expressions path

urlpatterns = [
    path('api/payment/', include('payment.urls')),
    path('admin/', admin.site.urls),
]

# For including React app build folder AS A TEMPLATE in Django. We want to pass the URLs (different from the above ones) to react router DOM on the frontend

urlpatterns += [
    re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
]