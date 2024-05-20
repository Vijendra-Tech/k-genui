
//@ts-nocheck
import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useMessageStore } from '../stores/useMessageStore'

export default function FeatureFlag() {
  const [alignment, setAlignment] = React.useState('v1')
  const setFeatureFlag = useMessageStore(state => state.setFeatureFlag)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    console.log('newAlignment', newAlignment)
    setAlignment(newAlignment)
    setFeatureFlag(newAlignment)
  }

  return (
    <div className="ml-28 mt-1">
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="v1" className='h-6'>V1</ToggleButton>
        <ToggleButton value="v2" className='h-6'>V2</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
