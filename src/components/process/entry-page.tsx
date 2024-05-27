import { useNavigate } from 'react-router-dom'
import { useMessageStore } from '../../stores/useMessageStore'
import { EmptyScreen } from '../empty-screen'
import { PromptForm } from '../prompt-form'
import React from 'react'

const conversatationList = [
  {
    id: 1,
    title: 'Problem Statement 1',
    description:
      'Client has higher distribution costs than peers. Aspires to reduce distribution costs by 10%-15% by 2025. Client wishes to identify levers for cost reduction and wants Kearney perspectives on developing a roadmap with specific strategies to achieve the same'
  },
  {
    id: 2,
    title: 'Problem Statement 2',
    description: ` 
        A fast-growing footwear retailer (ie Allbirds) has expanded into many new geographies over the past couple years. Recently, they have seen their supply chain costs increase significantly and are having trouble shipping products to stores and customers efficiently, leading to lost revenue from missed sales`
  },
  {
    id: 3,
    title: 'Problem Statement 3',
    description: ` 
        A key grocery client is seeing their in-store performance and profitability drop consequentially over the past few quarters. They believe this is driven by rising costs and changing consumer preferences. They would like Kearney to take a look and help diagnose the problem`
  }
]

const EntryPage = () => {
  const setProblemStatement = useMessageStore(
    state => state.setProblemStatement
  )
  const navigate = useNavigate()
  const [input, setInput] = React.useState('')
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <EmptyScreen />
      <h1 className="text-2xl font-bold mt-5">
        Pick one of the problem statements or create a new one
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 justify-center items-center gap-2 mt-5 rounded-md shadow">
        {conversatationList.map((problem: any, index) => (
          <div
            className="bg-zinc-50 w-80 h-56 flex flex-col justify-between items-center py-5 px-5 cursor-pointer rounded-md shadow-md border border-purple-500"
            key={index}
            role="custom-button"
            onClick={() => {
              setProblemStatement(problem.description)
              navigate('/process/problem-statement')
            }}
          >
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <p className="text-sm">{problem.description}</p>
          </div>
        ))}
      </div>
      <div className="fixed inset-x-0 bg-white/90 bottom-0 w-full duration-300 ease-in-out peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] dark:from-10%">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="grid gap-4 sm:pb-4">
            <PromptForm input={input} setInput={setInput} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
