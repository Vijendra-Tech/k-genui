//@ts-nocheck

import * as React from 'react'
import SummaryContainer from './summary-container'
import ImagesCarausal from '../images-carausal'
import { useImageSrcs } from '../../lib/hooks/use-image-srcs'
import { slide3 } from './data/slides'
import { useMessageStore } from '../../stores/useMessageStore'
import SummaryStep from './summary-step'

function ViewSummary() {
  const [open, setOpen] = React.useState(true)
  const containerRef = React.useRef(null)
  const { srcs } = useImageSrcs(
    containerRef,
    slide3.map(slide => slide.pageIndex)
  )
   const imgSrcs = useMessageStore(state => state.imgSrcs)
  return (
    <div className='bg-muted rounded'>
      <SummaryContainer
        open={open}
        setOpen={setOpen}
        title="Research Topic 1"
        dackLink="https://google.com"
        className="flex flex-col gap-2 justify-start px-4"
      >
        <ImagesCarausal imgs={imgSrcs} />
      </SummaryContainer>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '50vh' }}
        className="hidden"
      ></div>
      <SummaryStep />
    </div>
  )
}

export default ViewSummary
