import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

const OrderTraker = ({activeStep}) => {
    const steps = [
        "placed",
        "order Confirmed",
        "Shipped",
        "Out for delivery",
        "Delivered"
    ]
  return (
    <div className='w-full'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {
            steps.map((label) => (
                <Step>
                    <StepLabel sx={{color:"#9155FD", fontSeize:"44px"}}>{label}</StepLabel>
                </Step>
            ))
        }

      </Stepper>
    </div>
  )
}

export default OrderTraker
