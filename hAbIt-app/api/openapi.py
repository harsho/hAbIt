import openai
import logging

logging.basicConfig(level=logging.INFO)

class OpenAIAPI:
    def __init__(self):
        self.openai_client = openai.OpenAI()
    

    def generate_response(self, prompt):
        response = self.openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=4096,
            temperature=0.2,
        )
        response = response.choices[0].message.content
        return response
    