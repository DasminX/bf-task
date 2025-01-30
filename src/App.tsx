import { useState } from "react";

import { Field } from "./components/Field";
import { Tools } from "./components/Tools";

export default function App() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <main
      id="main"
      className="w-full h-full flex justify-center items-center gap-4.5"
    >
      <Field isCreating={isCreating} />
      <Tools />
    </main>
  );
}
