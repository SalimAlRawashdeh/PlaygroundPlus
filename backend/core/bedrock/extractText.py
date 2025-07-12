def extractText(response_body, model_id):
    if model_id == "amazon.titan-text-lite-v1":
        return response_body.get("results", [{}])[0].get("outputText")

    elif model_id.startswith("arn:aws:bedrock") and "deepseek" in model_id:
        return response_body.get("choices", [{}])[0].get("text")

    elif "completions" in response_body:
        return response_body.get("completions", [{}])[0].get("data", {}).get("text")

    return response_body.get("generation") or response_body.get("completion")