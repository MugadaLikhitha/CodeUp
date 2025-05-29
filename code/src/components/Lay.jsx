import React from "react";
import Pro from "./Pro";

const Lay = ({ setCode, selectedLanguage, setSelectedLanguage }) => {
  return (
    <>
      <select
        className="form-select mb-3 w-auto"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>
      <Pro language={selectedLanguage} setCode={setCode} />
    </>
  );
};

export default Lay;
