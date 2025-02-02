import { Canvas } from "./components/canvas/Canvas";
import { Editor } from "./components/editor/Editor";
import { useRef } from "react";
import { onExportToPngHandler } from "./functions/exportToPng";

export default function App() {
  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <main
      id="main"
      className="w-full min-h-screen h-full bg-[var(--white)] flex justify-center items-center gap-6"
    >
      <Canvas ref={exportRef} />
      <Editor
        onExportToPng={async () => {
          await onExportToPngHandler(exportRef.current);
        }}
      />
    </main>
  );
}
