import { Stepper, Typography, StepLabel, Step } from '@mui/material';
import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: 'border-box',
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} className="stepper">
        {steps.map((step, index) => (
          <Step
            key={index}
            className={`
              ${index === activeStep ? 'active-step' : ''} 
              ${index < activeStep ? 'completed-step' : ''}`}
          >
            <StepLabel
              icon={step.icon}
              className={`step-label ${index === activeStep ? 'active-step' : ''} ${index < activeStep ? 'completed-step' : ''}`}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
