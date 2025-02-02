import { Field } from "./components/Field";
import { Tools } from "./components/Tools";
import { useRef } from "react";
import { onExportToPngHandler } from "./functions/exportToPng";

export default function App() {
  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <main
      id="main"
      className="w-full min-h-screen h-full bg-[var(--white)] flex justify-center items-center gap-6"
    >
      <Field ref={exportRef} />
      <Tools
        onExportToPng={async () => {
          await onExportToPngHandler(exportRef.current);
        }}
      />
    </main>
  );
}
