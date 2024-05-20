import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import React, { Suspense } from 'react'
import PushPinIcon from '@mui/icons-material/PushPin'
import FeedbackIcon from '@mui/icons-material/Feedback'
import FeedabackConatainer from './feedback-container'
import { Select } from '@mui/material'

interface ImagesCarausalProps {
  imgs: Array<string>
}

function ImagesCarausal({ imgs }: ImagesCarausalProps) {
  console.log('imgs', imgs)
  const [open, setOpen] = React.useState(false)
  return (
    <>
      {imgs.length === 0 && (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
      <Suspense fallback={<>Loading...</>}>
        <div className="relative">
          <Carousel
            showThumbs={false}
            autoFocus={true}
            showArrows={true}
            useKeyboardArrows={true}
            // onClickItem={(index, item) => setOpen(false)}
            className="w-full h-full presentation-mode border-2"
            showIndicators={false}
          >
            {imgs?.map((src, index) => (
              <div className="flex gap-2 px-8 justify-start items-center bg-black">
                {/* <PushPinIcon
              className="cursor-pointer text-white bg-primary rounded-full w-2 h-2"
              onClick={() => {
                console.log('clicked')
              }}
            /> */}
                <div
                  className="w-[65%] shadow-md border-2 border-t-purple-700 bg-white my-5 mx-5 flex flex-col justify-center items-center ml-24"
                  key={index}
                >
                  <div className="relative flex space-x-20 justify-between">
                    <PushPinIcon
                      className="cursor-pointer text-white bg-primary rounded-full w-2 h-2"
                      onClick={() => {
                        console.log('clicked')
                      }}
                    />
                    <a
                      href=""
                      target="_blank"
                      className="underline text-blue-500"
                    >
                      Deck link1
                    </a>

                    <span role="button" onClick={() => setOpen(true)}>
                      <FeedbackIcon className="text-purple-700" />
                    </span>
                    <FeedabackConatainer
                      show={open}
                      setShow={setOpen}
                      className="border border-primary rounded shadow-lg h-full w-full px-2"
                    >
                      <p className="text-xs">Please provide your feedback</p>
                      <Select className="w-full h-10 px-2">
                        <option>Relavant </option>
                        <option>Not Relavant</option>
                      </Select>
                    </FeedabackConatainer>
                  </div>
                  <img
                    key={index}
                    src={src}
                    alt="slide"
                    width={'100%'}
                    height={'100vh'}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Suspense>
    </>
  )
}

const ImagesCarausalMemo = React.memo(ImagesCarausal)

export default ImagesCarausalMemo
