import React, { useEffect, useState } from "react";
import TestCases from "./TestCases";
import { generateStarterCode } from "@/utils/generateStarterCode";
import { Code, PenTool, Settings, RefreshCw } from "react-feather";
import { minify } from "terser";
import { useEditorSettings } from "@/context/EditorContext";
import { useModal } from "@/context/ModalContext";
import { js_beautify } from "js-beautify";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import { themes } from "@/themes";
import type { ProblemArgument } from "@/data/Problem";

interface EditorProps {
  starterCode?: string;
  problemName: string;
  problemArgs: ProblemArgument[];
}

const Editor: React.FC<EditorProps> = ({
  starterCode,
  problemName,
  problemArgs,
}) => {
  const { editorSettings } = useEditorSettings();
  const { setShowModal } = useModal();
  const [code, setCode] = useState(
    starterCode || generateStarterCode(problemName, problemArgs)
  );

  const monaco = useMonaco();

  useEffect(() => {
    // all available themes - https://editor.bitwiser.in/
    if (monaco) {
      // adds alla themes to the editor instance
      for (const [key, value] of Object.entries(themes)) {
        monaco.editor.defineTheme(key, value);
      }
      monaco.editor.setTheme(editorSettings.theme);
    }
  }, [monaco, editorSettings.theme]);

  console.log(editorSettings);

  return (
    <>
      <div className="flex flex-shrink-0 flex-wrap items-center justify-between bg-bg-dark pb-2 pr-2 pt-2 text-sm text-text-dimmed">
        <span>{`{ ${code.length} }`}</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={async () => {
              setCode(generateStarterCode(problemName, problemArgs));
            }}
            className="flex items-center gap-2 rounded-md bg-bg-dimmed py-1 px-3"
          >
            <RefreshCw className="h-3 w-3" />
            Reset code
          </button>
          <button
            onClick={async () => {
              try {
                setCode(js_beautify(code));
              } catch (error) {
                alert(
                  "Kunde inte formatera din kod eftersom att du har syntax errors, fixa dem och försök igen"
                );
              }
            }}
            className="flex items-center gap-2 rounded-md bg-bg-dimmed py-1 px-3"
          >
            <PenTool className="h-3 w-3" />
            Format code
          </button>
          <button
            onClick={async () => {
              try {
                const r = await minify(code);
                setCode(r.code || "");
              } catch (error) {
                alert(
                  "Kunde inte minify din kod eftersom att du har syntax errors, fixa dem och försök igen"
                );
              }
            }}
            className="flex items-center gap-2 rounded-md bg-bg-dimmed py-1 px-3"
          >
            <Code className="h-3 w-3" /> Minify code
          </button>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-md bg-bg-dimmed py-1 px-3"
          >
            <Settings className="h-3 w-3" /> Editor settings
          </button>
        </div>
      </div>

      <div className="flex h-full flex-col overflow-y-scroll">
        <div className="h-[calc(100%_-_0px)]">
          <MonacoEditor
            loading={<BouncingBalls />}
            wrapperProps={{
              style: {
                position: "relative",
                display: "flex",
                textAlign: "initial",
                width: "100%",
                height: "100%",
              },
              // style: 'padding:10px;position:absolute;'
              // className: '!p-1 !background-red-500 !block'
            }}
            className={""}
            height={"100%"}
            language={"javascript"}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme={editorSettings.theme}
            options={{
              scrollBeyondLastLine: false,
              automaticLayout: true,
              minimap: {
                enabled: editorSettings.minimap,
              },
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
              fontSize: editorSettings.fontSize,
              cursorStyle: editorSettings.cursorStyle,
              wordWrap: "on",
              lineNumbers: editorSettings.showLineNumber ? "on" : "off",
              // wordWrap: 'wordWrapColumn',
              // wordWrapColumn: 90,
              // wordWrapBreakAfterCharacters: 'continue',

              // try "same", "indent" or "none"
              wrappingIndent: "same",
            }}
          />
        </div>
        <TestCases code={code} />
      </div>
    </>
  );
};

export default Editor;
