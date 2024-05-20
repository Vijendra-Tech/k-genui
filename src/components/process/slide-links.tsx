
//@ts-nocheck
import React, { createRef, useRef } from 'react'
import SlideImageContainer from '../slide-image'

interface SlideLinkProps {
  slides: Array<any>
}

function SlideLink({ slides }: SlideLinkProps) {
  const refs = React.useRef([])
  const containerRef = useRef(null)
  const links = slides.map((_, i) => _.pageIndex)

  refs.current = slides.map((_, i) => refs.current[i] ?? createRef())
  return (
    <div className="flex justify-start items-center border border-purple-700">
      {/* {slides.map((slide, index) => (
        <>
          <SlideImageContainer ref={refs.current[index]} slideIndex={links} />
        </>
      ))} */}

      <SlideImageContainer ref={containerRef} slideIndex={links} />
    </div>
  )
}

export default SlideLink
