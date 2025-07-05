from django.urls import path
from . import views

urlpatterns = [
    path('api/ask/', views.ask, name='ask'),
    path('api/get_prompts/', views.get_prompts, name='get_prompts')
]