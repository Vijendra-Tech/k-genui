//@ts-nocheck

interface AccordianGridsProps {
  title: string
  children: React.ReactNode
  showPPT?: boolean
  setShowPPT?: (showPPT: boolean) => void
}
import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from '@mui/material'

function AccordianGrids({
  title,
  children,
  showPPT,
  setShowPPT
}: AccordianGridsProps) {
  return (
    <div>
      <Accordion defaultExpanded className="" sx={{ mt: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            <Link
              onClick={() => {
                // window.open(
                //   'https://drive.google.com/drive/folders/1HnPMLTrnwkqYwbUAfnSBC_pEI19lfUhW',
                //   '_blank'
                // )

                setShowPPT ? setShowPPT(true) : null
              }}
            >
              {title}
            </Link>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  )
}

export default AccordianGrids
