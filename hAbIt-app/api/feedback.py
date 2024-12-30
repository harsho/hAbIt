import openai
from dotenv import load_dotenv
import os
import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pathlib import Path
#load_dotenv(Path("/Users/harshao/Documents/pythontutorial/hAbIt/hAbIt-app/api/.env.local"))


app = FastAPI()
# Load the environment variables from .env.local
#load_dotenv('.env.local')
print(os.getenv('ENV') )
if os.getenv('ENV') == 'development':
    load_dotenv('.env.local')  # Local development
else:
    load_dotenv()

# Access the API key
openai_api_key = os.getenv('OPENAI_API_KEY')
# Use the API key


logging.basicConfig(level=logging.INFO)

class FeedbackRequest(BaseModel):
    persona: str
    habit_name: str
    progress_summary: str
def generate_feedback(persona, habit_name, progress_summary):
    openai.api_key = openai_api_key

    prompt = (
        f"You are a {persona} helping a user stick to their habit. "
        f"The habit is {habit_name}. The user’s recent progress is: {progress_summary}. "
        f"Provide a motivational message and one practical tip."
    )
    #engine="text-davinci-003",
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=150
    )

    return response.choices[0].message.content 
#return response.choices[0].text.strip()
@app.post("/api/feedback")
def feedback_endpoint(request: FeedbackRequest):
    feedback = generate_feedback(request.persona, request.habit_name, request.progress_summary)
    return {"feedback": feedback}

# Example Python Prompt Structure for AI Feedback
#persona = "Personal Trainer"
#habit_name = "Running"
#progress_summary = "User has completed 3 runs this week and increased duration by 10%."
#prompt = f"You are a {persona} helping a user stick to their habit. The habit is {habit_name}. The user’s recent progress is: {progress_summary}. Provide a motivational message and one practical tip."

# Example Usage
persona = "Personal Trainer"
habit_name = "Running"
progress_summary = "User has failed to go on any runs this week" #"User has completed 3 runs this week and increased duration by 10%."

feedback = generate_feedback(persona, habit_name, progress_summary)
print(feedback)