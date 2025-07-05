# modelList.py

def get_model_payloads(prompt_data):
    return {
        # Meta LLaMA 3
        "meta.llama3-70b-instruct-v1:0": {
            "prompt": f"<|system|>\nYou are a helpful assistant.\n<|user|>\n{prompt_data}\n<|assistant|>\n",
            "max_gen_len": 512,
            "temperature": 0.5,
            "top_p": 0.9
        },
        # Amazon Titan
        "amazon.titan-text-lite-v1": {
            "inputText": f"User: {prompt_data}\nBot:",
            "textGenerationConfig": {
                "maxTokenCount": 512,
                "temperature": 0.7,
                "topP": 0.95
            }
        },

        # Anthropic Claude v2
        "anthropic.claude-v2": {
            "prompt": f"Human: {prompt_data}\n\nAssistant:",
            "max_tokens_to_sample": 512,
            "temperature": 0.5,
            "anthropic_version": "bedrock-2023-05-31"
        },

        "arn:aws:bedrock:us-west-2:952029066932:inference-profile/us.anthropic.claude-3-haiku-20240307-v1:0": {
          "messages": [
            {"role": "user", "content": prompt_data}
          ],
          "max_tokens": 512,
          "temperature": 0.5,
          "anthropic_version": "bedrock-2023-05-31"
        },

        # DeepSeek R1 (✅ FIXED: changed 'input' ➝ 'prompt')
        "arn:aws:bedrock:us-west-2:952029066932:inference-profile/us.deepseek.r1-v1:0": {
            "prompt": prompt_data,
            "max_tokens": 512,
            "temperature": 0.6,
            "top_p": 1.0
        }
    }
