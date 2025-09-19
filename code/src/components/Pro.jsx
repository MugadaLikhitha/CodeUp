import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";

const Pro = ({ language, setCode }) => {
  const [code, setLocalCode] = useState("");

  useEffect(() => {
    const defaults = {
      c: `#include <stdio.h>\nint main() {\n  int x;\n  scanf("%d", &x);\n  printf(" %d\\n", x + 10);\n  return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  int x;\n  cin >> x;\n  cout  << x + 10 << endl;\n  return 0;\n}`,
      java: `import java.util.*;\npublic class Temp {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int x = sc.nextInt();\n    System.out.println((x + 10));\n  }\n}`,
      python: `x = int(input())\nprint( x + 10)`,
    };
    setLocalCode(defaults[language] || "");
    setCode(defaults[language] || "");
  }, [language]);

  const getExtensions = () => {
    switch (language) {
      case "c":
      case "cpp":
        return [cpp()];
      case "java":
        return [java()];
      case "python":
        return [python()];
      default:
        return [];
    }
  };

  return (
    <CodeMirror
      value={code}
      height="300px"
      theme={dracula}
      extensions={getExtensions()}
      onChange={(value) => {
        setLocalCode(value);
        setCode(value);
      }}
    />
  );
};

export default Pro;
