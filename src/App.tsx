import { useState } from "react";
import { ActionButton } from "./ui/molecules/ActionButton";
import { Img } from "./ui/organisms/Img";

export default function App() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <main
      id="main"
      className="w-full h-full flex justify-center items-center gap-4.5"
    >
      <ActionButton
        actionText="hiho"
        iconSource="text.svg"
        onClick={() => {
          console.log("elo");
        }}
      />
      <Img />
    </main>
  );
}
