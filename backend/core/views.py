from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .bedrock.llama2 import ask_query

@csrf_exempt
def ask(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('user_input', '')
        responses = ask_query(user_input)
        return JsonResponse({'responses': responses})
    return JsonResponse({'error': 'Invalid request method'}, status = 400)
