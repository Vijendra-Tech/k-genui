import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
// import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TopicSelection from './process/topic-selection'
import GenerateStoryLine from './process/generate-storyline'
import Confirmation from './process/confirmation'
import FinalGreeting from './process/final-greeting'
import { Button } from './ui/button'
import { useMessageStore } from '../stores/useMessageStore'
import ViewSummary from './process/view-summary'
import RefreshTopics from './process/refresh-topics'

export default function VerticalChat() {
  const [activeStep, setActiveStep] = React.useState(0)
  const problemStatement = useMessageStore(state => state.problemStatement)
  const setProblemStatement = useMessageStore(
    state => state.setProblemStatement
  )
  const setMessages = useMessageStore(state => state.setMessages)
  const setHideTextArea = useMessageStore(state => state.setHideTextArea)

  const steps = [
    // {
    //   label: 'Start',
    //   description: (
    //     <div className="flex flex-col gap-2 rounded-2xl bg-muted sm:p-8 p-4 text-sm sm:text-base items-start mt-5">
    //       <h2 className="text-sm sm:text-xl tracking-tight  max-w-fit inline-block">
    //         Start the process by entering the problem statement
    //       </h2>
    //       <RefreshTopics />
    //     </div>
    //   )
    // },
    {
      label: 'Problem Statement',
      description: (
        <>
          <div className="max-h-[300px] overflow-auto">{problemStatement}</div>
        </>
      )
    },
    {
      label: 'Research Topics',
      description: <TopicSelection />
    },
    {
      label: 'View/Add Content',
      description: <ViewSummary />
    },
    // {
    //   label: 'Storyline',
    //   description: <SummaryStep />
    // },
    {
      label: 'View Storyline',
      description: <GenerateStoryLine />
    },
    {
      label: 'Generate Draft',
      description: <Confirmation />
    },
    {
      label: 'Finished',
      description: <FinalGreeting />
    }
    // {
    //   label: 'Summary',
    //   description: (
    //     <>
    //          <ViewSummary />
    //     </>
    //   )
    // }
  ]

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setHideTextArea(true)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
    if (activeStep === 1) {
      setHideTextArea(false)
    }
  }

  const handleReset = () => {
    setActiveStep(0)
    setHideTextArea(false)
    setProblemStatement('')
    setMessages([])
  }

  return (
    <div className="flex justify-center overflow-auto flex-col items-center relative">
      <Box sx={{ minWidth: 700, maxWidth: 700 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 7 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div className="flex gap-2 py-2">
                    <Button onClick={handleNext} className="bg-primary ">
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      variant={'outline'}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Paper>
        )}
      </Box>
    </div>
  )
}
