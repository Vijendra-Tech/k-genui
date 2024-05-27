import { nanoid } from 'nanoid'
import { useMessageStore } from '../../stores/useMessageStore'
import { Button } from '../ui/button'
import BotMessage from '../bot-message'
import Confirmation from './confirmation'
// import PPTOutPut from './ppt-output'
import { StepDefinition } from '../step-def'
import MultiCarousalSlide from '../multi-slide-carousal'
import { useNavigate } from 'react-router-dom'

function GenerateStoryLine() {
  const messages = useMessageStore(state => state.messages)
  const setMessages = useMessageStore(state => state.setMessages)
  const featureFlag = useMessageStore(state => state.featureFlag)
  const navigate = useNavigate()
  return (
    <div className="rounded-2xl flex flex-col px-40 py-5 space-y-2">
      <StepDefinition stepName="View Storyline" route="/process/view-summary" />
      <div className="">
        <h1 className="text-xl">Your Storyline is ready , Check this</h1>
        <MultiCarousalSlide items={4}>
          {Array.from({ length: 10 }).map((_, index) => (
            <img
              src={`https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60`}
              alt={`Storyline ${index}`}
              className="h-80 w-80 rounded-lg"
            />
          ))}
        </MultiCarousalSlide>
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
      <hr />
      <div className="flex justify-end">
        <Button
          onClick={() => {
            navigate('/process/generate-draft')
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default GenerateStoryLine
