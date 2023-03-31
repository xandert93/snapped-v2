import { Grid, IconButton, MobileStepper } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { selectRegistrationStepIndex } from '../../state/auth-selectors';
import { toPrevRegistrationStep } from '../../state/auth-slice';
import { selectIsFormDisabled } from '../../../ui/state/ui-selectors';

import useStyles from './styles';

export const RegistrationMobileStepper = ({ stepCount }) => {
  const classes = useStyles();
  const stepIndex = useSelector(selectRegistrationStepIndex);
  const isLastStep = stepIndex === stepCount - 1;

  return (
    <Grid item xs={12}>
      <MobileStepper //limitation is that it does not enable us to keep step mounted between step changes
        className={classes.mobileStepper}
        variant="progress" // dots* || text || progress
        steps={stepCount}
        position="static" // static || bottom* || top (latter two fixed position to bottom of screen)
        activeStep={stepIndex}
        LinearProgressProps={{
          //props for nested <linearProgress/>
          classes: {
            root: classes.progressBox,
            bar: classes.progress,
          },
        }}
        backButton={<BackButton />}
        nextButton={<NextButton isLastStep={isLastStep} />}
      />
    </Grid>
  );
};

const BackButton = () => {
  const dispatch = useDispatch();

  const handleBackClick = () => dispatch(toPrevRegistrationStep());

  const stepIndex = useSelector(selectRegistrationStepIndex);
  return (
    <IconButton onClick={handleBackClick} disabled={stepIndex === 0}>
      <KeyboardArrowLeft />
    </IconButton>
  );
};

const NextButton = ({ isLastStep }) => {
  const isFormDisabled = useSelector(selectIsFormDisabled);

  // onSubmit fires "toNextRegistrationStep()"
  return (
    <IconButton type="submit" form="auth-form" disabled={isLastStep ? true : isFormDisabled}>
      <KeyboardArrowRight />
    </IconButton>
  );
};

/*DESKTOP STEPPER:*/
// return (
//   <Stepper activeStep={stepIndex} orientation="vertical" className={classes.stepperPaper}>
//     {steps.map(({ title, Component, props }) => (
//       <Step key={title}>
//         <StepLabel>{title}</StepLabel>
//         <StepContent TransitionProps={{ unmountOnExit: false }}>
//           <Grid container spacing={2}>
//             <Component {...props} />
//           </Grid>
//           <Box className={classes.actionButtons}>
//             <IconButton onClick={updateIndex(-1)} disabled={stepIndex === 0}>
//               <ArrowUpward />
//             </IconButton>
//             <IconButton onClick={updateIndex(1)} disabled={isFormDisabled}>
//               <ArrowDownward />
//             </IconButton>
//           </Box>
//         </StepContent>
//       </Step>
//     ))}
//   </Stepper>
// );
