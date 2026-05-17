from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use working Gemini model
model = genai.GenerativeModel("models/gemini-2.5-flash")

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class ForecastRequest(BaseModel):
    question: str

# Home route
@app.get("/")
def home():
    return {
        "message": "OracleX Backend Running Successfully"
    }

# Forecast route
@app.post("/forecast")
def generate_forecast(data: ForecastRequest):
    try:

        prompt = f"""
        You are OracleX AI Forecasting Engine.

        Analyze this future prediction question carefully.

        Question:
        {data.question}

        Give response in this format:

        Prediction:
        (Short clear prediction)

        Probability:
        (Give percentage)

        Risks:
        (2-3 short points)

        Future Impact:
        (Short future impact)

        Rules:
        - Keep answer concise
        - Keep answer professional
        - Do not use markdown symbols like ** or ##
        """

        response = model.generate_content(prompt)

        return {
            "forecast": response.text
        }

    except Exception as e:
        return {
            "forecast": f"Error: {str(e)}"
        }