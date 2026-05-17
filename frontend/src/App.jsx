import React, { useState, useEffect } from "react";
import {
  Brain,
  Rocket,
  Cpu,
  Sparkles,
  Activity,
  Mic,
} from "lucide-react";

import jsPDF from "jspdf";

export default function App() {

  const [question, setQuestion] = useState("");
  const [prediction, setPrediction] = useState("");
  const [displayedPrediction, setDisplayedPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // FORECAST HISTORY

  const [history, setHistory] = useState([]);

  // LIVE CLOCK

  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  // LIVE TIME EFFECT

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // REAL AI FORECAST FUNCTION

  const generatePrediction = async () => {

    if (!question.trim()) return;

    setLoading(true);

    try {

      const response = await fetch(
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

      const data = await response.json();

      setPrediction("");
      setDisplayedPrediction("");

      let index = 0;

      const fullText = data.forecast;

      const interval = setInterval(() => {

        setDisplayedPrediction(
          fullText.slice(0, index)
        );

        index++;

        if (index > fullText.length) {

          clearInterval(interval);

          setPrediction(fullText);

          // SAVE HISTORY

          setHistory((prev) => [
            {
              question: question,
              response: fullText,
              time: new Date().toLocaleTimeString(),
            },
            ...prev.slice(0, 4),
          ]);
        }

      }, 15);

    } catch (error) {

      console.error(error);

      setPrediction(
        "OracleX Neural Core failed to connect with forecasting servers."
      );
    }

    setLoading(false);
  };

  // VOICE AI

  const startVoiceRecognition = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition not supported.");

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setQuestion(transcript);

      setListening(false);
    };

    recognition.onerror = () => {

      setListening(false);
    };

    recognition.onend = () => {

      setListening(false);
    };
  };

  // DOWNLOAD PDF REPORT

  const downloadReport = () => {

    if (!prediction) return;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");

    doc.setFontSize(22);

    doc.text("OracleX AI Forecast Report", 20, 25);

    doc.setFontSize(12);

    doc.setFont("helvetica", "normal");

    doc.text(
      `Question: ${question}`,
      20,
      45
    );

    const splitText = doc.splitTextToSize(
      prediction,
      170
    );

    doc.text(splitText, 20, 65);

    doc.save("OracleX_Report.pdf");
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0ea5e920,transparent_35%),radial-gradient(circle_at_bottom_right,#8b5cf620,transparent_35%)]"></div>

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* TOP SYSTEM BAR */}

      <div className="
      relative
      z-30
      flex
      justify-between
      items-center
      px-12
      py-4
      border-b
      border-white/10
      bg-black/20
      backdrop-blur-xl
      ">

        <div>

          <h2 className="
          text-lg
          font-bold
          text-cyan-300
          tracking-[3px]
          ">

            ORACLEX NEURAL SYSTEM

          </h2>

        </div>

        <div className="
        text-right
        ">

          <h3 className="
          text-2xl
          font-black
          text-white
          ">

            {currentTime.toLocaleTimeString()}

          </h3>

          <p className="
          text-sm
          text-gray-400
          ">

            {currentTime.toDateString()}

          </p>

        </div>

      </div>

      {/* NAVBAR */}

      <nav className="relative z-20 flex items-center justify-between px-12 py-8 border-b border-white/10">

        <h1 className="
        text-4xl
        font-black
        tracking-wide
        bg-gradient-to-r
        from-cyan-400
        via-blue-400
        to-pink-500
        bg-clip-text
        text-transparent
        ">

          OracleX

        </h1>

        <div className="flex gap-10 text-lg font-semibold text-white/70">

          <a href="#" className="hover:text-cyan-400 transition">
            Forecast
          </a>

          <a href="#" className="hover:text-pink-400 transition">
            Technology
          </a>

          <a href="#" className="hover:text-blue-400 transition">
            AI Engine
          </a>

          <a href="#" className="hover:text-violet-400 transition">
            Future
          </a>

        </div>

      </nav>

      {/* LIVE STATUS BAR */}

      <div className="
      relative
      z-20
      px-12
      pt-6
      ">

        <div className="
        flex
        flex-wrap
        justify-center
        gap-6
        ">

          {[
            {
              label: "Neural Systems",
              value: "ONLINE",
              color: "text-green-400",
            },
            {
              label: "Forecast Engine",
              value: "ACTIVE",
              color: "text-cyan-400",
            },
            {
              label: "Quantum Nodes",
              value: "248",
              color: "text-pink-400",
            },
            {
              label: "Prediction Accuracy",
              value: "98.2%",
              color: "text-yellow-400",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="
              bg-white/5
              border
              border-white/10
              backdrop-blur-xl
              rounded-2xl
              px-6
              py-4
              min-w-[220px]
              hover:bg-white/10
              transition-all
              duration-300
              "
            >

              <p className="
              text-sm
              text-gray-400
              mb-2
              tracking-[2px]
              uppercase
              ">

                {item.label}

              </p>

              <h3 className={`
              text-2xl
              font-black
              ${item.color}
              `}>

                {item.value}

              </h3>

            </div>

          ))}

        </div>

      </div>

      {/* HERO */}

      <section className="
      relative
      z-10
      max-w-7xl
      mx-auto
      px-10
      pt-24
      grid
      lg:grid-cols-2
      gap-16
      items-center
      ">

        {/* LEFT */}

        <div>

          <div className="
          inline-flex
          items-center
          gap-2
          px-5
          py-2
          rounded-full
          border
          border-cyan-400/20
          bg-white/5
          mb-8
          text-cyan-300
          text-sm
          tracking-wide
          ">

            <Sparkles size={16} />

            NEXT GENERATION AI FORECASTING

          </div>

          <h1 className="
          text-[90px]
          leading-[0.9]
          font-black
          tracking-tight
          ">

            <span className="block">
              Predict
            </span>

            <span className="block">
              Tomorrow
            </span>

            <span className="block">
              With
            </span>

            <span className="
            bg-gradient-to-r
            from-cyan-400
            via-blue-400
            to-pink-500
            bg-clip-text
            text-transparent
            ">

              OracleX

            </span>

          </h1>

          <p className="
          mt-10
          text-xl
          text-gray-300
          leading-10
          max-w-xl
          ">

            Cinematic AI forecasting platform powered by futuristic neural
            intelligence, predictive analytics, immersive simulations,
            and next-generation forecasting systems.

          </p>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="
          absolute
          -top-16
          -right-16
          w-72
          h-72
          bg-cyan-500/20
          rounded-full
          blur-[120px]
          "></div>

          <div className="
          absolute
          -bottom-16
          -left-16
          w-72
          h-72
          bg-violet-500/20
          rounded-full
          blur-[120px]
          "></div>

          <div className="
          relative
          bg-white/5
          backdrop-blur-2xl
          border
          border-white/10
          rounded-[40px]
          p-10
          shadow-2xl
          ">

            <h2 className="
            text-center
            text-4xl
            font-black
            mb-10
            tracking-[4px]
            ">

              ORACLEX NEURAL CORE

            </h2>

            <div className="grid grid-cols-2 gap-6">

              {[
                ["98%", "Prediction Accuracy"],
                ["24/7", "AI Runtime"],
                ["∞", "Forecast Streams"],
                ["AI", "Quantum Engine"],
              ].map((item, index) => (

                <div
                  key={index}
                  className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-10
                  text-center
                  hover:scale-105
                  hover:bg-white/10
                  transition
                  duration-300
                  "
                >

                  <h3 className="
                  text-5xl
                  font-black
                  bg-gradient-to-r
                  from-cyan-300
                  to-blue-400
                  bg-clip-text
                  text-transparent
                  ">

                    {item[0]}

                  </h3>

                  <p className="
                  mt-4
                  text-lg
                  text-gray-300
                  ">

                    {item[1]}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* FORECAST SECTION */}

      <section
        id="forecast-section"
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-10
        pt-36
        pb-20
        "
      >

        <h2 className="
        text-center
        text-7xl
        font-black
        ">

          AI Forecast Engine

        </h2>

        <p className="
        text-center
        text-gray-400
        mt-5
        text-xl
        ">

          Ask OracleX to predict future scenarios,
          technologies, and intelligent transformations.

        </p>

        {/* CONTINUE SAME BELOW AS PREVIOUS VERSION */}
      </section>

    </div>
  );
}