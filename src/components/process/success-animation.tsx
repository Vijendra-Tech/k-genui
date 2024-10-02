import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
type Props = {}

const SuccessSignal = () => {
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ scale: 1, transition: { duration: 0.5 } })
      await new Promise(resolve => setTimeout(resolve, 2000)) // Wait for 2 seconds
      controls.start({
        flexDirection: 'row',
        transition: { duration: 0.5 }
      })
      controls.start({
        width: '2rem',
        height: '2rem',
        transition: { duration: 0.5 },
        fontSize: '2rem',
        borderRadius: '50%'
      })
    }

    sequence()
  }, [controls])

  return (
    <motion.div
      initial={{ scale: 0, flexDirection: 'column' }}
      animate={controls}
      className="flex justify-center items-center gap-4 w-full"
    >
      <motion.div
        initial={{ width: '6rem', height: '6rem' }}
        animate={controls}
        style={{ borderRadius: '50%' }}
        className="flex justify-center items-center bg-green-500 text-white text-4xl py-1 px-1"
      >
        ✓
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.5, duration: 0.5 } }}
        className="text-xl whitespace-nowrap"
      >
        Your request has been successfully processed
      </motion.span>
    </motion.div>
  )
}

const AnimationSuccess = (props: Props) => {
  const [show, setShow] = useState(true)
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <SuccessSignal />
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 3.5, duration: 0.5 } }}
          className="flex gap-4 mt-4 items-center"
        >
          <p>Do you want to poceed for process feedback?</p>
          <Button size={'sm'} onClick={() => {}}>
            Yes
          </Button>
          <Button size={'sm'} onClick={()=>setShow(false)}>No</Button>
        </motion.div>
      )}
    </div>
  )
}

export default AnimationSuccess
