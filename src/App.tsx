import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { exportToPng } from "./functions/export-to-png";
import { AppContext } from "./context/AppContextProvider";
import { Canvas } from "./ui/components/canvas/Canvas";
import { Editor } from "./ui/components/editor/Editor";
import { WarningModal } from "./ui/components/modal/WarningModal";

export default function App() {
  const { changeActiveField, isModal, removeField } = useContext(AppContext);
  const [shouldExportToPng, setShouldExportToPng] = useState<boolean>(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldExportToPng) {
      (async () => {
        await exportToPng(exportRef.current);
        setShouldExportToPng(false);
      })();
    }
  }, [shouldExportToPng]);

  const onExportToPngHandler = useCallback(() => {
    changeActiveField();
    setShouldExportToPng(true);
  }, [changeActiveField]);

  const deleteKeyPressHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Delete") return;

      const activeField = document.querySelector("div.field[data-active='true']") as HTMLDivElement | null;
      if (!activeField) return;

      if (activeField.dataset.id) {
        removeField(activeField.dataset.id);
      }
    },
    [removeField],
  );

  useEffect(() => {
    window.addEventListener("keydown", deleteKeyPressHandler);

    return () => {
      window.removeEventListener("keydown", deleteKeyPressHandler);
    };
  }, [deleteKeyPressHandler]);

  return (
    <main id="main" className="w-full min-h-screen h-full bg-[var(--white)] flex justify-center items-center gap-6">
      <Canvas ref={exportRef} />
      <Editor onExportToPng={onExportToPngHandler} />
      {isModal && <WarningModal />}
    </main>
  );
}
