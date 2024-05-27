import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'

interface StepDefinitionProps {
  stepName: string
  route?: string
}

export const StepDefinition = ({
  stepName,
  route = ''
}: StepDefinitionProps) => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between bg-muted w-full mt-10">
      {route ? (
        <div className='w-12 h-12 rounded-full bg-white border border-purple-500 mt-5 mx-5'> 
        <ArrowLeftIcon
          className="size-8 mt-2 mx-2 cursor-pointer"
          onClick={() => {
            navigate(route)
          }}
        />
        </div>
      ) : (
        <div className="invisible ml-2">←</div>
      )}
      <div className="flex flex-col gap-1 justify-center items-center py-2">
        <p className="text-sm sm:text-xl tracking-tight  max-w-fit inline-block">
          Step
        </p>
        <h1 className="text-3xl font-bold">{stepName}</h1>
      </div>
      <div className="invisible ml-2">←</div>
    </div>
  )
}
