import LeftPanel from "./components/LeftPanel"
import Title from "./components/Title"
import Answer from "./components/Answer"
import { Button } from "./components/ui/Button"
import Timer from "./components/Timer"
import { fetcher } from "./utils/fetcher"
import useSWR from "swr"


function App() {
  const { data: questions, error, isLoading } = useSWR('/api', fetcher)
  console.log(questions)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>


  return (
    <div className="bg-background h-screen w-screen overflow-hidde flex justify-center items-center">
      <div className="w-[65%] flex gap-4">
        <LeftPanel />
        <div className="border-[12px] border-secondary w-full rounded-2xl bg-primary flex flex-col gap-5   py-4 px-5 text-center">
          <Timer time={20} />
          <Title title="Duid de 3 dingen aan die niet op een vegetarische pizza thuis horen." />
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <Answer answer="Deeg" />
            <Answer answer="Tomatensaus" />
            <Answer answer="Pepperoni" />
            <Answer answer="Spinazie" />
            <Answer answer="Mozarella" />
            <Answer answer="Gehaktballen" />
            <Answer answer="Groene asperges" />
            <Answer answer="Ajuinen" />
            <Answer answer="Paddenstoelen" />
            <Answer answer="Hesp" />
          </div>
          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            <Button>Klaar!</Button>
            <Button>Geef me een tip...</Button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default App