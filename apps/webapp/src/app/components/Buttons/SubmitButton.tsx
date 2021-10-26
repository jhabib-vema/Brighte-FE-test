import { Button as MUIButton, ButtonProps as MUIButtonProps, CircularProgress } from '@mui/material';

interface SubmitButtonProps extends MUIButtonProps {
  loading?: boolean;
  className?: string;
}

// TODO: Implement loading state button for better UX
export const SubmitButton = (props: SubmitButtonProps) => {
  const { loading, children, disabled, className, ...rest } = props;

  return (
    <MUIButton sx={{ minHeight: '2.5rem', minWidth: '5rem' }} {...rest} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} /> : children}
    </MUIButton>
  );
};
