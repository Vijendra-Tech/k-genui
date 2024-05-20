import { use, useEffect, useState } from 'react'
import { getIntTopics, saveIntTopics, updateTopics } from '../../models/tbb'
import Cookies from 'js-cookie'
import { topics } from './data/topics'
import { Button } from '../ui/button'
import { nanoid } from 'nanoid'
import { PinTopIcon } from '@radix-ui/react-icons'
import { IconClose } from '../ui/icons'

function RefreshTopics() {
  const [intTopics, setIntTopics] = useState<any>([])
  const user = Cookies.get('email')
  const [text, setText] = useState('')
  //   const availableTopics = useLiveQuery(() => {
  //     if (user) {
  //       const avTopics = getIntTopics(user)
  //       return avTopics
  //     }
  //   }, [user])
  useEffect(() => {
    ;(async () => {
      if (user) {
        const avTopics = await getIntTopics(user)
        //save on api call
        if (avTopics && avTopics.length > 0) {
          console.log('availableTopics', avTopics)
          //@ts-ignore
          setIntTopics(avTopics[0].topics)
        } else {
          //call api and save in the index db
          await saveIntTopics(user, topics)
            setIntTopics(topics)
        }
      }
    })()
  }, [])
  return (
    <div className="flex flex-col gap-2">
      Hello from list
      {intTopics?.map((topic: any) => {
        return (
          <div className="flex  gap-2  py-2">
            <Button key={topic.id}>{topic.name}</Button>
            <IconClose onClick={()=>{
                const newTopics = intTopics.filter((t:any)=>t.id !== topic.id)
                setIntTopics(newTopics)
                if(user){
                    updateTopics(user,newTopics)
                }
            }}/>
          </div>
        )
      })}
      <form
        onSubmit={e => {
          e.preventDefault()
          //@ts-ignore
          const allToics = [...intTopics, { id: nanoid(), name: text ,isNew:true,mode:'selected'}]
          //@ts-ignore
          setIntTopics(allToics)
          //@ts-ignore
          updateTopics(user, allToics)
          setText('')
        }}
      >
        <input
          type="text"
          onChange={e => {
            setText(e.target.value)
          }}
          value={text}
        />
        <Button className='ml-2'>Save</Button>
      </form>
    </div>
  )
}

export default RefreshTopics
