import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { FormControl, TextField, TextFieldProps } from '@mui/material';

export interface InputProps {
  name: string;
  label?: string;
  control: Control;
  disabled?: boolean;
  rules?: RegisterOptions;
  type?: 'number' | 'text';
  variant?: TextFieldProps['variant'];
}

export const Input = (props: InputProps) => {
  const { name, label, disabled = false, control, type = 'text', rules = {}, variant = 'standard' } = props;
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={{ width: '100%', mb: 2 }}>
          <TextField
            label={label}
            type={type}
            error={!!error}
            variant={variant}
            disabled={disabled}
            ref={field.ref}
            name={field.name}
            value={field.value || ''}
            onBlur={field.onBlur}
            onChange={field.onChange}
            helperText={error && error.message}
          />
        </FormControl>
      )}
    />
  );
};
