import json
import boto3

from .extractText import extractText
from .modelList import get_model_payloads
from .modelHashMap import modelIDs
from ..models import storePrompts

bedrock = boto3.client("bedrock-runtime", region_name="us-west-2")

def ask_query(prompt, model_ids):
    results = {}

    prompt_data = prompt
    model_payloads = get_model_payloads(prompt_data)

    for model in model_ids:
        model_id = modelIDs[model]
        payload = model_payloads[model_id]
        body = json.dumps(payload)

        response = bedrock.invoke_model(
            body=body,
            modelId=model_id,
            accept="application/json",
            contentType="application/json"
        )

        response_body = json.loads(response["body"].read())
        response_text = extractText(response_body, model_id)

        results[model] = response_text

        yield f"data: {json.dumps({model: response_text})}\n\n"

    storePrompts.objects.create(
        prompt=prompt,
        model_ids=model_ids,
        response=results
    )