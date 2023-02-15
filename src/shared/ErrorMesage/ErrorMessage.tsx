import { Box } from '@mui/material';
import { ErrorMessage as Message } from 'formik';

interface IErrorMessage {
  name?: string;
  className?: string;
}

export const ErrorMessage = ({ name = ''}: IErrorMessage) => {
  return (
    <Message
      name={name}
      render={(messError) => <Box sx={{ color: '#ff3366', mt: 0.3, ml: 0.5, fontSize: 14 }}>{messError}</Box>}
    />
  );
};
