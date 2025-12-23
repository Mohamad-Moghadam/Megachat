from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MessageSerializer

class EchoMessageView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.validated_data['message']
            return Response({'response': f'your message: {message}'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        message = request.query_params.get('message', '')
        if message:
            return Response({'response': f'your message: {message}'})
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
