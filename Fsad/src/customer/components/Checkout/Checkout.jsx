import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'react-router-dom';

import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
// import OrderSummary from './OrderSummary'; // when ready

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function HorizontalLinearStepper() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Default to step=2 (Delivery Address)
  const stepParam = parseInt(searchParams.get('step')) || 2;
  const activeStep = stepParam - 1;

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = () => false;

  const renderStepContent = () => {
    switch (stepParam) {
      case 1:
        return <Typography sx={{ mt: 2 }}>Login (placeholder)</Typography>;
      case 2:
        return <DeliveryAddressForm />;
      case 3:
        return <OrderSummary/>
      case 4:
        return <Typography sx={{ mt: 2 }}>Payment (placeholder)</Typography>;
      default:
        return <Typography sx={{ mt: 2 }}>Invalid step</Typography>;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {renderStepContent()}
      </Box>
    </Box>
  );
}
