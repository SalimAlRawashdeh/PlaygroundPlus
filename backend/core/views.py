from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .bedrock.getResponse import ask_query
from .models import storePrompts

@csrf_exempt
def ask(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('user_input', '')
        model_ids = data.get('chosenModels', '')

        responses = ask_query(user_input, model_ids)

        storePrompts.objects.create (
            prompt = user_input,
            model_ids = model_ids,
            response = responses
        )

        return JsonResponse({'responses': responses})
    return JsonResponse({'error': 'Invalid request method'}, status = 400)

def get_prompts(request):
    prompts = storePrompts.objects.all().values('id', 'prompt', 'model_ids', 'response', 'timestamp')
    data = list(prompts)
    print (data)
    return JsonResponse({'responses': data})
