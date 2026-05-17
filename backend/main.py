from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

# Request model
class ForecastRequest(BaseModel):
    question: str

# Home route
@app.get("/")
def home():
    return {
        "message": "OracleX Forecast API Running"
    }

# Forecast endpoint
@app.post("/forecast")
async def forecast(data: ForecastRequest):

    prompt = f"""
    You are OracleX Neural Forecast Engine.

    Predict future outcomes professionally and intelligently.

    User Question:
    {data.question}

    Return:
    - Prediction
    - AI Confidence
    - Future Impact
    - Timeline
    - Reasoning

    Make the response futuristic and cinematic.
    """

    response = model.generate_content(prompt)

    return {
        "forecast": response.text
    }