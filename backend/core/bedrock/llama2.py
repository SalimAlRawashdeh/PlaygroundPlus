import json
import boto3
from .models import get_model_payloads
from .modelHashMap import modelIDs


bedrock = boto3.client("bedrock-runtime", region_name="us-west-2")

def ask_query(prompt):
    results = {}

    prompt_data = prompt
    model_payloads = get_model_payloads(prompt_data)

    for key, value in modelIDs.items():
        model_id = value
        payload = model_payloads[model_id]
        body = json.dumps(payload)

        response = bedrock.invoke_model(
            body=body,
            modelId=model_id,
            accept="application/json",
            contentType="application/json"
        )

        response_body = json.loads(response["body"].read())
        response_text = None

        if model_id == "amazon.titan-text-lite-v1":
            # Titan Lite returns 'results' list with 'outputText'
            response_text = response_body.get("results", [{}])[0].get("outputText")

        elif model_id.startswith("arn:aws:bedrock") and "deepseek" in model_id:
            # DeepSeek returns 'choices' list with 'text'
            if "choices" in response_body and len(response_body["choices"]) > 0:
                response_text = response_body["choices"][0].get("text")

        else:
            # Other models might return 'completions' list with nested 'data.text'
            if "completions" in response_body and len(response_body["completions"]) > 0:
                response_text = response_body["completions"][0].get("data", {}).get("text")
            else:
                # Or might just have 'generation' or 'completion' keys directly
                response_text = response_body.get("generation") or response_body.get("completion")

        print(response_text)
        results[key] = response_text

    return results
