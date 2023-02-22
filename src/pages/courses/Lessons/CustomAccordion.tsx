import {ExpandMore} from '@mui/icons-material'
import {Accordion, AccordionDetails, AccordionSummary, Box} from '@mui/material'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import VideoPlayer from './VideoPlayer'

const CustomAccordion = styled(Accordion)({
  backgroundColor: 'white',
  boxShadow: 'none',
  '&::before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
})

const CustomAccordionSummary = styled(AccordionSummary)({
  backgroundColor: '#e5e5e5',
  borderBottom: '1px solid #e5e5e5',
  marginBottom: -1,
  '& .MuiAccordionSummary-content': {
    margin: '12px 0',
  },
})

const CustomAccordionDetails = styled(AccordionDetails)({
  padding: '20px',
})

interface CustomAccordionProps {
  title: string
  index: number
  description: string
  videoUrl: string
}

const AccordionExample: React.FC<CustomAccordionProps> = ({
  title,
  description,
  videoUrl,
  index,
}) => {
  return (
    <>
      <CustomAccordion>
        <CustomAccordionSummary
          expandIcon={<ExpandMore color='inherit' />}
          sx={{
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px',
          }}
        >
          Lesson {index}
        </CustomAccordionSummary>

        <div className='row'>
          <div className='col-md-8'>
            <div className='' style={{minHeight: '310px'}}>
              <VideoPlayer url={videoUrl} />
            </div>
          </div>
          <div className='col-md-4'>
            <Box sx={{border: '1px solid #edf6f9'}}>
              <CustomAccordionDetails>{title}</CustomAccordionDetails>
              <CustomAccordionDetails>{description}</CustomAccordionDetails>
            </Box>
          </div>
        </div>
      </CustomAccordion>
    </>
  )
}

export default AccordionExample
