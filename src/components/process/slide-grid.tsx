import * as React from 'react'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SlideLink from './slide-links'
// import { slides } from './data/slides'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAlt from '@mui/icons-material/ThumbDownOffAlt'
import { Button } from '../ui/button'
import { useMessageStore } from '../../stores/useMessageStore'
import { nanoid } from 'nanoid'
import BotMessage from '../bot-message'
import SummaryStep from './summary-step'
import { Input } from '../ui/input'
import { slide1, slide2, slide3 } from './data/slides'
import FeedbackForm from './feedback-form'
import AccordianGrids from '../accordian-grid'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import PPTOutPut from './ppt-output'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

function createData(
  checked: boolean,
  topic: string,
  content: string,
  slink: string,
  sdlink: string,
  slides: any,
  decks?: any
) {
  return {
    checked,
    topic,
    content,
    slink,
    sdlink,
    slides,
    decks
  }
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const [slideFeedback, setSlideFeedback] = React.useState(false)
  const [showPPT, setShowDeck] = React.useState(false)
  const refs = React.useRef({})

  React.useEffect(() => {
    //@ts-ignore
    refs.current[row.topic] = row.slides?.map(
      //@ts-ignore
      (_: any, i: number) => refs.current[row.topic]?.[i] ?? React.createRef()
    )
  }, [row])
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Input type="checkbox" checked={row.checked} />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.topic}
        </TableCell>
        <TableCell align="right">{row.content}</TableCell>
        <TableCell align="right">{row.slink}</TableCell>
        <TableCell align="right">{row.sdlink}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.decks && row.decks.length > 0 ? (
              row.decks.map((deck: any, index: number) => (
                <AccordianGrids
                  title={deck}
                  key={index}
                  setShowPPT={setShowDeck}
                >
                  <SlideLink slides={row.slides} />
                </AccordianGrids>
              ))
            ) : (
              <AccordianGrids title={row.sdlink} setShowPPT={setShowDeck}>
                <SlideLink slides={row.slides} />
              </AccordianGrids>
            )}

            <div className="flex justify-start ml-4 py-5">
              <span onClick={() => setSlideFeedback(true)}>
                <ThumbUpOffAltIcon className="cursor-pointer" />
              </span>
              <span onClick={() => setSlideFeedback(true)}>
                <ThumbDownOffAlt className="cursor-pointer" />
              </span>
            </div>
            {slideFeedback && (
              <FeedbackForm open={slideFeedback} onClose={setSlideFeedback} />
            )}
          </Collapse>
        </TableCell>
      </TableRow>
      <BootstrapDialog
        onClose={() => setShowDeck(false)}
        aria-labelledby="customized-dialog-title"
        open={showPPT}
        sx={{ '& .MuiDialog-paper': { width: '100%' } }}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Deck Link 001
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setShowDeck(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <PPTOutPut />
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  )
}

const rows = [
  createData(true, 'Topic 1', 'Content 1', 'link 1', 'deckLink001', slide1, []),
  createData(
    false,
    'Topic 2',
    'Content 2',
    'link 2',
    'deckLink001',
    slide2,
    []
  ),
  createData(
    true,
    'Topic 3',
    'Content 3',
    'link 3,4,8',
    'deckLink002',
    slide3,
    ['deckLink002']
  )
]

export default function SlidesGrid() {
  const messages = useMessageStore(state => state.messages)
  const setMessages = useMessageStore(state => state.setMessages)
  const featureFlag = useMessageStore(state => state.featureFlag)
  const [openFeedback, setFeedbackForm] = React.useState(false)
  // const containerRef = React.useRef(null)
  // const [showRef, setShowRef] = React.useState(false)
  // const [imgSrc, setImgSrc] = React.useState<any>()

  React.useEffect(() => {
    // const container = containerRef.current

    // let PSPDFKit
    // ;(async () => {
    //   PSPDFKit = await import('pspdfkit')
    //     .then(module => module.default)
    //     .catch(err => {
    //       console.log('loading error', err)
    //     })

    //   PSPDFKit?.unload(container) // Ensure that there's only one PSPDFKit instance.
    //   const instance = await load({
    //     document: '/generated_presentation.pptx',
    //     container,
    //     baseUrl: `${window.location.protocol}//${window.location.host}/${
    //       import.meta.env.PUBLIC_URL ?? ''
    //     }`,
    //     licenseKey:
    //       '1b1rI6g9qIdEjrRNSlPWYCTTpNg0-4O4V9vtj_vcmRkf_2lVKaoLdLzrM0oCZJTiEQYWppsfGWuY9RKJDIKACXhHpIzpnT-SyX4pPP7gsbFqZXIJaxkqa0PkCuR3ZaAUdJbK0J6OAfJAFgrXacFSgScuoh3SP5-gyF_KqkBk8hkbBh7dKzU7Br8v2ppCV7kbjJ9sOiXaJSF001w'
    //   })
    //   const src = await thumbailPreview(instance, 0)
    //   console.log('src', src)
    //   setImgSrc(src)
    // })()
  }, [])
  return (
    <>
      <div className="flex flex-col border shadow-slate-300 bg-muted rounded-2xl">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead className="bg-muted">
              <TableRow>
                <TableCell />
                <TableCell>Research Topic</TableCell>
                <TableCell align="right">Rendering of Slide content</TableCell>
                <TableCell align="right">Slide Link</TableCell>
                <TableCell align="right">Slide Deck Link</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <Row key={row.topic} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-between py-5">
          {/* <div className="flex justify-start ml-4">
            <span onClick={() => setFeedbackForm(true)}>
              <ThumbUpOffAltIcon className="cursor-pointer" />
            </span>
            <span onClick={() => setFeedbackForm(true)}>
              <ThumbDownOffAlt className="cursor-pointer" />
            </span>
          </div> */}
          {featureFlag !== 'v2' && (
            <Button
              className="mx-4"
              onClick={() => {
                setMessages([
                  ...messages,
                  {
                    id: nanoid(),
                    display: (
                      <BotMessage content={''}>
                        <SummaryStep />
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
      </div>
      {openFeedback && (
        <FeedbackForm open={openFeedback} onClose={setFeedbackForm} />
      )}
      {/* {true && (
        <div
          ref={containerRef}
          style={{ width: '100%', height: '50vh' }}
          className="hidden"
        ></div>
      )}
      <React.Suspense fallback={<div>Loading...</div>}>
        <img src={imgSrc} alt="slide preview" />
      </React.Suspense> */}
    </>
  )
}
