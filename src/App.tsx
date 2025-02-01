import { Field } from "./components/Field";
import { Tools } from "./components/Tools";

export default function App() {
  return (
    <main
      id="main"
      className="w-full h-full bg-[var(--white)] flex justify-center items-center gap-6"
    >
      <Field />
      <Tools />
    </main>
  );
}
