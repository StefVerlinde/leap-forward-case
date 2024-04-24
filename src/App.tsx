import LeftPanel from "./components/LeftPanel"
import Title from "./components/Title"
import Answer from "./components/Answer"
import { Button } from "./components/ui/Button"
import Timer from "./components/Timer"

function App() {
  return (
    <div className="bg-background h-screen w-screen overflow-hidde flex justify-center items-center">
      <div className="w-[65%] flex gap-4">
        <LeftPanel />
        <div className="border-[12px] border-secondary w-full rounded-2xl bg-primary flex flex-col gap-4 py-4 px-5 text-center">
          <Timer time={5} />
          <Title title="Duid de 3 dingen aan die niet op een vegetarische pizza thuis horen." />
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <Answer answer="Ananas" />
            <Answer answer="Ananas" />
            <Answer answer="Ananas" />
            <Answer answer="Ananas" />
          </div>
          <Button>Hallooo</Button>
          <Button>Hallooo</Button>
        </div>
      </div>
    </div>
  )
}

export default App