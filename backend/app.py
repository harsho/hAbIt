from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from feedback import FeedbackRequest, generate_feedback
#from src.openai_api import OpenAIAPI
#from src.prompts import image_gen_prompt, summary_gen_prompt, new_img_prompts
import logging
#from src.utils import parse_reponse



logging.basicConfig(level=logging.INFO)


app = FastAPI()

#
@app.post("/backend/api/feedback")
def feedback_endpoint(request: FeedbackRequest):
    try:
        feedback = generate_feedback(request.persona, request.habit_name, request.progress_summary)
        return {"feedback": feedback}
    except Exception as e:
        logging.error(f"Error generating feedback: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)