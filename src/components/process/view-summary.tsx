//@ts-nocheck

import * as React from 'react'
import SummaryContainer from './summary-container'
import ImagesCarausal from '../images-carausal'
import { useImageSrcs } from '../../lib/hooks/use-image-srcs'
import { slide3 } from './data/slides'
import { useMessageStore } from '../../stores/useMessageStore'
import SummaryStep from './summary-step'
import { StepDefinition } from '../step-def'
import MultiCarousalSlide from '../multi-slide-carousal'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

function ViewSummary() {
  const [open, setOpen] = React.useState(true)
  const containerRef = React.useRef(null)
  const { srcs } = useImageSrcs(
    containerRef,
    slide3.map(slide => slide.pageIndex)
  )
  const navigate = useNavigate()
  const imgSrcs = useMessageStore(state => state.imgSrcs)
  return (
    <>
      <div className="px-40 overflow-auto max-h-[720px]">
        <StepDefinition
          stepName="View/Add Content"
          route="/process/topic-selection"
        />
        <div className="bg-zinc-50 rounded mt-5 ">
          {/* <SummaryContainer
          open={open}
          setOpen={setOpen} 
          title="Research Topic 1"
          dackLink="https://google.com"
          className="flex flex-col gap-2 justify-start px-4"
        > */}
          <MultiCarousalSlide items={4}>
            {/* <div className=""> */}
            {Array.from({ length: 10 }).map((_, index) => (
              <>
                <div className="h-20 flex flex-col bg-muted rounded shadow-md items-center cursor-pointer pb-1 overflow-auto px-1 mx-2">
                  <h1 className="text-xl ">{`ReseachTopic ${index}`}</h1>
                  <p>Slides :{index + 1}</p>
                </div>
              </>
            ))}
            {/* </div> */}
          </MultiCarousalSlide>
          <hr className="mt-1" />
          <ImagesCarausal imgs={imgSrcs} />
          {/* </SummaryContainer> */}
          <div
            ref={containerRef}
            style={{ width: '100%', height: '50vh' }}
            className="hidden"
          ></div>
          <SummaryStep />
        </div>
        <hr className="mt-2 px-40" />
      </div>

      <div className="flex justify-end mt-2 px-40">
        <Button
          onClick={() => {
            navigate('/process/generate-storyline')
          }}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default ViewSummary
