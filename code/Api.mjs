import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/compile", (req, res) => {
  const { code, language, input } = req.body;
  const filePath = path.join(__dirname, "temp");

  let ext, compileCmd, runCmd;
  
  switch (language) {
    case "C":
      ext = "c";
      compileCmd = `gcc ${filePath}.${ext} -o ${filePath}.exe`;
      runCmd = `${filePath}.exe`;
      break;
    case "C++":
      ext = "cpp";
      compileCmd = `g++ ${filePath}.${ext} -o ${filePath}.exe`;
      runCmd = `${filePath}.exe`;
      break;
    case "Java":
      ext = "java";
      compileCmd = `javac ${filePath}.${ext}`;
      runCmd = `java -cp ${__dirname} temp`;
      break;
    case "Python":
      ext = "py";
      compileCmd = "";
      runCmd = `python ${filePath}.${ext}`;
      break;
    default:
      return res.json({ error: "Unsupported language" });
  }

  // Write the code to a temporary file
  fs.writeFileSync(`${filePath}.${ext}`, code);

  // Compile (if required)
  if (compileCmd) {
    exec(compileCmd, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        return res.json({ error: compileStderr || "Compilation failed" });
      }
      executeCode(runCmd, filePath, ext, input, res);
    });
  } else {
    executeCode(runCmd, filePath, ext, input, res);
  }
});

function executeCode(runCmd, filePath, ext, input, res) {
  const process = exec(runCmd, { timeout: 5000 }, (runError, runStdout, runStderr) => {
    if (runError) {
      res.json({ error: runStderr || "Execution error" });
    } else {
      res.json({ output: runStdout });
    }
    
    // Cleanup files
    fs.unlinkSync(`${filePath}.${ext}`);
    if (fs.existsSync(`${filePath}.exe`)) fs.unlinkSync(`${filePath}.exe`);
  });

  // Provide input to the program
  if (input) {
    process.stdin.write(input + "\n");
    process.stdin.end();
  }
}

export default router;
