import React, { useState } from "react";
import axios from "axios";
import Lay from "./components/Lay";
import "./App.css";

const App = () => {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");


  const handleRun = async () => {
    setOutput("Running...");
    try {
      const res = await axios.post("http://localhost:5000/execute", {
        code,
        language: selectedLanguage,
        input,
      });
      setOutput(res.data.output || res.data.error || "No output");
    } catch {
      setOutput("Error connecting to server");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Online Code Compiler</h2>

      <Lay
        setCode={setCode}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        input={input}
        setInput={setInput}
      />

      <div className="io-container">
        <textarea
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input here..."
        />
        <div className="output-box">
          <p>Output</p>
          <p><strong><pre>{output}</pre></strong></p>
          
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleRun}>Run</button>
    </div>
  );
};

export default App;
