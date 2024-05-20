import { nanoid } from 'nanoid'
import { useMessageStore } from '../../stores/useMessageStore'
import { Button } from '../ui/button'
import BotMessage from '../bot-message'
import Final from './final'
import { MenuItem, Select } from '@mui/material'
import PPTOutPut from './ppt-output'
import { useState } from 'react'
import FinalDocViewer from './final-docviewer'

function Confirmation() {
  const messages = useMessageStore(state => state.messages)
  const setMessages = useMessageStore(state => state.setMessages)
  const featureFlag = useMessageStore(state => state.featureFlag)
  const [finalDraft, setFinalDraft] = useState(false)
  return (
    <div className="rounded-2xl  bg-muted flex flex-col gap-2 px-4 py-10">
      <p>Preview Document Draft</p>
      <div className="">
        <PPTOutPut />
      </div>
      <div className="flex gap-4">
        {featureFlag === 'v1' && (
          <>
            <Button
              onClick={() => {
                setMessages([
                  ...messages,
                  {
                    id: nanoid,
                    display: (
                      <BotMessage content="">
                        <Final />
                      </BotMessage>
                    )
                  }
                ])
              }}
            >
              Yes
            </Button>
            <Button variant={'outline'}>No</Button>
          </>
        )}
      </div>
      <div className="flex gap-2 justify-between">
        <Select className="w-1/2">
          <MenuItem>Relevant Draft</MenuItem>
        </Select>
        <Button onClick={() => setFinalDraft(true)}>Create Final Draft</Button>
      </div>
      {finalDraft && (
        <>
          <hr className="text-black" />
          <div className="mt-5">
            <p>Final Draft</p>
            <FinalDocViewer document={'generated_presentation.pptx'} />
          </div>
          <div className="flex justify-end">
            <Button>Download</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Confirmation
