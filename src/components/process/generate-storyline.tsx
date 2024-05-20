import { nanoid } from 'nanoid'
import { useMessageStore } from '../../stores/useMessageStore'
import { Button } from '../ui/button'
import BotMessage from '../bot-message'
import Confirmation from './confirmation'
import PPTOutPut from './ppt-output'

function GenerateStoryLine() {
  const messages = useMessageStore(state => state.messages)
  const setMessages = useMessageStore(state => state.setMessages)
  const featureFlag = useMessageStore(state => state.featureFlag)
  return (
    <div className="rounded-2xl bg-muted flex flex-col px-4 py-5 space-y-2">
      {/* <div className="flex gap-4">
        <h2>Generate Storyline</h2>
        <Button>Create</Button>
      </div> */}
      <div className="">
        <p>Your Storyline is ready , Check this</p>
        <PPTOutPut /> 
      </div>
      <div className="flex justify-end">
        {featureFlag === 'v1' && (
          <Button
            onClick={() => {
              setMessages([
                ...messages,
                {
                  id: nanoid,
                  display: (
                    <BotMessage content="">
                      <Confirmation />
                    </BotMessage>
                  )
                }
              ])
            }}
          >
            Next
          </Button>
        )}
      </div>
      {/* <div className='bg-white flex items-center px-3 min-h-20'>
        <FormControl className='w-1/2 mt-5'>
          <InputLabel id="demo-simple-select-label">Select Draft Feedback</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age" 
            // onChange={handleChange}
          >
            <MenuItem value={10}>Relevant Draft </MenuItem>
            <MenuItem value={20}>Draft is not relevant</MenuItem>
            <MenuItem value={30}>Missing Information</MenuItem>
          </Select>
        </FormControl>
      </div> */}
    </div>
  )
}

export default GenerateStoryLine
