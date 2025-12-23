from django.urls import path
from .views import EchoMessageView

urlpatterns = [
    path('echo/', EchoMessageView.as_view(), name='echo-message'),
]
