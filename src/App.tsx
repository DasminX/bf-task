import { Canvas } from "./components/canvas/Canvas";
import { Editor } from "./components/editor/Editor";
import { useContext, useRef } from "react";
import { onExportToPngHandler } from "./functions/export-to-png";
import { AppContext } from "./context/AppContext";

export default function App() {
  const { changeActive } = useContext(AppContext);
  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <main
      id="main"
      className="w-full min-h-screen h-full bg-[var(--white)] flex justify-center items-center gap-6"
    >
      <Canvas ref={exportRef} />
      <Editor
        onExportToPng={async () => {
          changeActive();
          await onExportToPngHandler(exportRef.current);
        }}
      />
    </main>
  );
}
