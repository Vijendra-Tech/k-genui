import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

interface VerticalTabsProps {
  FistComp: React.ReactNode
  SecondComp: React.ReactNode
}

function VerticalTabs({ FistComp, SecondComp }: VerticalTabsProps) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
     console.log(event);
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex'
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '200px' }}
      >
        <Tab
          label="Internal Topics"
          {...a11yProps(0)}
          sx={{
            '&.Mui-selected': {
              color: 'white',
              backgroundColor: 'hsl(var(--primary))'
            }
          }}
        />
        <Tab
          label="External Topics"
          {...a11yProps(1)}
          sx={{
            '&.Mui-selected': {
              color: 'white',
              backgroundColor: 'hsl(var(--primary))'
            },
            color: ''
          }}
        />
      </Tabs>
      <div className="overflow-auto">
        <TabPanel value={value} index={0}>
          {FistComp}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {SecondComp}
        </TabPanel>
      </div>
    </Box>
  )
}

export default VerticalTabs
