
//@ts-nocheck
import { Presentation } from 'react-pptx'

const ReactPptxViewer = () => {
  return (
    <div>
      <Presentation
        pptx={'../public/generated_presentation.pptx'}
        style={{ width: 800, height: 600 }}
        rtlMode={true}
        slide={2}
        hidden={[1, 3]}
        children={<div>Custom content</div>}
        //@ts-ignore
        slideStyle={slide => ({
          backgroundColor: slide.index % 2 === 0 ? 'red' : 'blue'
        })}
      />
    </div>
  )
}

export default ReactPptxViewer
