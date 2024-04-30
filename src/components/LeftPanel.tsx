import { ArrowRotateRight, MapSolid, MusicNote, QuestionSolid } from '@/assets/icons'
import StopwatchSolid from '../assets/icons/stopwatch-solid.svg?react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import { Button } from './ui/Button'


const LeftPanel = () => {
    return (
        <div className="bg-secondary w-full rounded-2xl max-w-[30%] p-3 flex flex-col">
            <div className='relative  text-sm bg-left-panel-background h-[160px] bg-cover bg-gray-800 bg-opacity-70 bg-blend-multiply rounded-t-2xl'>
                <div className="flex gap-3 p-3">
                    <div className="text-white bg-secondary rounded-md font-bold py-2 px-4 mx-auto border-b-[4px] border-primary border-opacity-80 flex items-center gap-2">
                        <StopwatchSolid className="w-4 fill-white" />
                        31:55
                    </div>
                    <div className="flex-1 text-white bg-secondary rounded-md font-bold p-2 mx-auto border-b-[4px] border-primary border-opacity-80 flex items-center gap-2">
                        <div className='bg-background h-full w-1/2 rounded-sm relative'>
                            <div className='absolute left-0 h-full w-[30%] bg-yellow-300 rounded-sm'></div>
                        </div>
                        <p className='text-center flex-1'>Level 3 / 10</p>
                    </div>
                </div>
                <Avatar className='bg-blue-300 size-[100px] mx-auto absolute bottom-[-20px] left-1/2 translate-x-[-50%] '>
                    <AvatarImage src="src/assets/avatar.png" />
                    <AvatarFallback>Profile Image</AvatarFallback>
                </Avatar>
            </div>
            <div className='bg-white flex-1 rounded-b-2xl flex flex-col gap-y-3 items-center py-12 px-4 text-text text-center'>
                <h1 className='text-2xl font-bold pb-3 border-b-2 border-b-secondary'>De fabriek</h1>
                <p>Aha, je bent terg! Net op tijd: Onze eerste bestelling is binnen. Een lokale school wil haar studenten vegetaricshe lunch maaltijden aanbieden. Stel de machines in voor...</p>
                <p>Een gezonde <b>vegetarische</b> pizza met 7 gepaste ingredieënten</p>
            </div>
            <div className='mt-3 flex justify-between'>
                <Button variant='seconday' size='icon'><QuestionSolid className='size-5 fill-white' /></Button>
                <Button variant='seconday' size='icon'><ArrowRotateRight className='size-5 fill-white' /></Button>
                <Button variant='seconday' size='icon'><MusicNote className='size-5 fill-white' /></Button>
                <Button variant='highlight' className='flex gap-2 items-center'><MapSolid className='size-5 fill-primary' /> Naar de kaart</Button>
            </div>
        </div>
    )
}

export default LeftPanel