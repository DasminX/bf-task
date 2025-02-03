import { useCallback, useContext, useRef } from "react";
import { exportToPng } from "./functions/export-to-png";
import { AppContext } from "./context/AppContextProvider";
import { Canvas } from "./ui/components/canvas/Canvas";
import { Editor } from "./ui/components/editor/Editor";
import { WarningModal } from "./ui/components/modal/WarningModal";

export default function App() {
  const { changeActiveField, isModal } = useContext(AppContext);
  const exportRef = useRef<HTMLDivElement>(null);

  const onExportToPngHandler = useCallback(async () => {
    changeActiveField();
    await exportToPng(exportRef.current);
  }, [changeActiveField, exportToPng]);

  return (
    <main id="main" className="w-full min-h-screen h-full bg-[var(--white)] flex justify-center items-center gap-6">
      <Canvas ref={exportRef} />
      <Editor onExportToPng={onExportToPngHandler} />
      {isModal && <WarningModal />}
    </main>
  );
}
