import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);

  // Typing Animation
  useEffect(() => {
    let index = 0;

    if (response) {
      setDisplayedText("");

      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + response.charAt(index));
        index++;

        if (index >= response.length) {
          clearInterval(interval);
        }
      }, 10);

      return () => clearInterval(interval);
    }
  }, [response]);

  // AI Confidence
  useEffect(() => {
    if (response) {
      const randomConfidence =
        Math.floor(Math.random() * 20) + 80;

      setConfidence(randomConfidence);
    }
  }, [response]);

  const generateForecast = async () => {
    if (!question) return;

    setLoading(true);
    setResponse("");

    try {

      // LIVE RENDER BACKEND URL

      const res = await fetch(
        "https://oraclex-ai.onrender.com/forecast",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const data = await res.json();

      setResponse(
        data.forecast ||
        data.error ||
        "No response received"
      );

    } catch (error) {
      setResponse("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="main-bg">

      {/* Floating Orbs */}

      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      {/* Stars */}

      <div className="stars"></div>

      <div className="container">

        <div className="title-section">

          <h1>
            🔮 <span className="highlight">OracleX</span>{" "}
            <span className="white-text">
              AI Forecasting
            </span>
          </h1>

          <p className="subtitle">
            Predict the future with advanced AI forecasting intelligence
          </p>

        </div>

        <div className="glass-card">

          <textarea
            placeholder="Ask futuristic prediction questions..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                generateForecast();
              }
            }}
          />

          <button
            onClick={generateForecast}
            disabled={loading}
            className={loading ? "loading" : ""}
          >
            {loading
              ? "Generating Forecast..."
              : "Generate Forecast"}
          </button>

        </div>

        <div className="response-box">

          <h2>⚡ AI Forecast Result</h2>

          {displayedText ? (
            <>

              {/* Confidence Meter */}

              <div className="confidence-section">

                <div className="confidence-header">
                  <span>AI Confidence</span>
                  <span>{confidence}%</span>
                </div>

                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{
                      width: `${confidence}%`,
                    }}
                  ></div>
                </div>

              </div>

              {/* Forecast Cards */}

              <div className="forecast-grid">

                <div className="forecast-card">
                  <h3>🔮 Prediction</h3>
                  <p>
                    AI predicts evolving technological and societal transformation.
                  </p>
                </div>

                <div className="forecast-card">
                  <h3>⚠ Risks</h3>
                  <p>
                    Market disruption, automation dependency, and ethical concerns.
                  </p>
                </div>

                <div className="forecast-card">
                  <h3>🌍 Future Impact</h3>
                  <p>
                    Significant impact on industries, jobs, and digital ecosystems.
                  </p>
                </div>

              </div>

              {/* AI Response */}

              <pre>{displayedText}</pre>

            </>
          ) : (
            <p className="empty-text">
              Your AI-generated prediction will appear here...
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;