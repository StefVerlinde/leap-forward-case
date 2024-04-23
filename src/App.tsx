import LeftPanel from "./components/left-panel"
import Title from "./components/title"


function App() {
  return (
    <div className="bg-background h-screen w-screen overflow-hidde flex justify-center items-center">
      <div className="w-[65%] h-[200px] flex gap-4">
        <LeftPanel />
        <div className="border-[12px] border-secondary w-full rounded-2xl bg-primary flex flex-col py-4 px-5 text-center">
          <Title title="Duid de 3 dingen aan die niet op een vegetarische pizza thuis horen."/>
        </div>
      </div>
    </div>
  )
}

export default App