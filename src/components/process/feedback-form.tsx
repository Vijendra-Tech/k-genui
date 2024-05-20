import { useState } from 'react'
import { Button } from '../ui/button'
import { IconClose } from '../ui/icons'

interface FeedbackFormProps {
  open: any
  onClose: any
}

function FeedbackForm({ open, onClose }: FeedbackFormProps) {
  const [show, setShow] = useState(false)
  return (
    <>
      {open && (
        <div className="rounded-2xl bg-muted px-4 py-5 border border-purple-700 mt-5 w-full">
          <div className="flex  justify-between">
            <h1 className="text-lg font-semibold">Feedback</h1>
            <IconClose
              onClick={() => onClose(false)}
              className="cursor-pointer"
            />
          </div>
          {!show && (
            <p className="text-sm text-muted-foreground">
              Please provide your feedback
            </p>
          )}
          <form
            onSubmit={e => {
              e.preventDefault()
              setShow(true)
            }}
          >
            {show ? (
              <div className="bg-green-100 text-green-800 p-2 rounded-lg mt-2">
                Feedback submitted successfully
              </div>
            ) : (
              <>
                <textarea
                  className="w-full h-32 border border-input rounded-lg mt-2 p-2"
                  placeholder="Enter your feedback here"
                ></textarea>
                <Button
                  variant={'outline'}
                  className="border border-purple-500"
                  type="submit"
                >
                  Submit
                </Button>
              </>
            )}
          </form>
        </div>
      )}
    </>
  )
}

export default FeedbackForm
