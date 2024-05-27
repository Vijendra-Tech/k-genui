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
import { cn } from '../../lib/utils'

function ViewSummary() {
  const [open, setOpen] = React.useState(true)
  const containerRef = React.useRef(null)
  const { srcs } = useImageSrcs(
    containerRef,
    slide3.map(slide => slide.pageIndex)
  )
  const navigate = useNavigate()
  const imgSrcs = useMessageStore(state => state.imgSrcs)

  const [researchTopics, setResearchTopics] = React.useState([
    {
      id: 1,
      name: 'Research Topic 1',
      slides: 3,
      selected: true
    },
    {
      id: 2,
      name: 'Research Topic 2',
      slides: 2,
      selected: false
    },
    {
      id: 3,
      name: 'Research Topic 3',
      slides: 5,
      selected: false
    },
    {
      id: 4,
      name: 'Research Topic 4',
      slides: 4,
      selected: false
    },
    {
      id: 5,
      name: 'Research Topic 5',
      slides: 5,
      selected: false
    },
    {
      id: 6,
      name: 'Research Topic 6',
      slides: 5,
      selected: false
    }
  ])
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
            {researchTopics?.map((slide, index) => (
              <>
                <div
                  className={cn(
                    'h-20 flex flex-col bg-muted rounded shadow-md items-center cursor-pointer pb-1 overflow-auto px-1 mx-2',
                    {
                      'bg-purple-500': slide.selected,
                      'text-white': slide.selected
                    }
                  )}
                  key={slide.id}
                  role="custom-button"
                  onClick={() => {
                    setResearchTopics(prev => {
                      const newTopics = [...prev]
                      //all selected false
                      newTopics.forEach((topic, i) => {
                        newTopics[i] = {
                          ...newTopics[i],
                          selected: false
                        }
                      })
                      newTopics[index] = {
                        ...newTopics[index],
                        selected: !newTopics[index].selected
                      }
                      return newTopics
                    })
                  }}
                >
                  <h1 className="text-xl ">{slide.name}</h1>
                  <p>Slides :{slide.slides}</p>
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
