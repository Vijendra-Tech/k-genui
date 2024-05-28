import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import { IconClose } from './ui/icons'
import { Input } from './ui/input'

// const FeedbackForm = ({ open, close }: { open: boolean; close: any }) => {
//   return (
//     <div>
//       {open && (
//         <div className="flex gap-2 flex-col rounded  border border-purple-500 mt-5 w-96">
//           <div className="flex justify-between">
//             <p>Help us with your feedback</p>
//             <IconClose onClick={close} />
//           </div>
//           <div className='p-5'>
//             <Input
//               className="w-full h-24"
//               placeholder="Type your feedback here..."
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { Button } from './ui/button'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

function AlertDialogSlide({ open, setOpen }: { open: boolean; setOpen: any }) {
  //   const handleClickOpen = () => {
  //     setOpen(true)
  //   }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>
          <div className="flex justify-between">
            <p>Help us with your feedback </p>
            <IconClose onClick={handleClose} className='cursor-pointer'/>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Input
              className="w-full h-24"
              placeholder="Type your feedback here..."
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

const GeneralFeedback = ({ stepName }: { stepName: string }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="w-full">
      <div className="flex gap-2">
        <ThumbUpOffAltIcon className="cursor-pointer" />
        <span onClick={() => setOpen(true)}>
          <ThumbDownOffAltIcon className="cursor-pointer" />
        </span>
      </div>
      {/* <FeedbackForm open={open} close={() => setOpen(false)} /> */}
      <AlertDialogSlide open={open} setOpen={setOpen} />
    </div>
  )
}

export default GeneralFeedback
