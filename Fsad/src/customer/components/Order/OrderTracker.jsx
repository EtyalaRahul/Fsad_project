import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered"
];

const OrderTracker = ({ activeStep = 2 }) => {
  return (
    <div className='w-full'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <span className="text-[#9155FD] text-sm md:text-base font-medium">{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
