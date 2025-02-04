import html2canvas from "html2canvas";

export const exportToPng = async (elementToExport: HTMLElement | null) => {
  if (!elementToExport) return;
  try {
    const capturedCanvas = await html2canvas(elementToExport, {
      backgroundColor: null,
      onclone: (clonedDocument) => {
        clonedDocument.querySelectorAll("textarea").forEach((txta) => {
          const p = clonedDocument.createElement("p");
          const computedStyle = clonedDocument.defaultView?.getComputedStyle(txta);
          if (computedStyle) {
            for (let i = 0; i < computedStyle.length; i++) {
              const propertyName = computedStyle[i];
              const propertyValue = computedStyle.getPropertyValue(propertyName);
              const propertyPriority = computedStyle.getPropertyPriority(propertyName);
              p.style.setProperty(propertyName, propertyValue, propertyPriority);
            }
          }

          p.style.whiteSpace = "pre-wrap";
          p.innerHTML = txta.value.replace(/\n/g, "<br>");

          txta.parentNode?.replaceChild(p, txta);
        });
      },
    });

    const finalWidth = 1080;
    const finalHeight = 1350;

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = finalWidth;
    finalCanvas.height = finalHeight;
    const context = finalCanvas.getContext("2d");

    if (!context) return;

    context.drawImage(capturedCanvas, 0, 0, capturedCanvas.width, capturedCanvas.height, 0, 0, finalWidth, finalHeight);

    // Check if the File System Access API is available
    if ("showSaveFilePicker" in window && typeof window.showSaveFilePicker === "function") {
      const blob: Blob = await new Promise((resolve, reject) => {
        finalCanvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas is empty"));
          }
        }, "image/png");
      });

      try {
        const handle = await window.showSaveFilePicker({
          startIn: "downloads",
          suggestedName: "Wojciech_Szpila_zadanie_rekrutacyjne_ByteFine",
          types: [
            {
              description: "PNG Image",
              accept: { "image/png": [".png"] },
            },
          ],
        });

        const writable = await handle.createWritable({
          keepExistingData: false,
        });

        await writable.write(blob);
        await writable.close();
      } catch (saveError) {
        console.error("Error saving the file:", saveError);
      }
    } else {
      const pngDataUrl = finalCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngDataUrl;
      link.download = "Wojciech_Szpila_zadanie_rekrutacyjne_ByteFine.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error("Error exporting to PNG:", error);
  }
};
