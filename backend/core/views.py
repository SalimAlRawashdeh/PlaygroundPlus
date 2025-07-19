from django.http import JsonResponse, StreamingHttpResponse, HttpResponseNotAllowed
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

        return StreamingHttpResponse (
            streaming_content = ask_query(user_input, model_ids),
            content_type="text/event-stream"
        )

    return HttpResponseNotAllowed(['POST'])


def get_prompts(request):
    prompts = storePrompts.objects.all().values('id', 'prompt', 'model_ids', 'response', 'timestamp')
    data = list(prompts)
    return JsonResponse({'responses': data})
