import { Input } from '../Input';
import { Referral } from '../../types/referral';
import { PlacesAutoComplete } from '../PlacesAutoComplete';
import { ReferralFormValues } from '../../pages/ReferralList/ReferralList';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {
  Control,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';

/* 
	NOTE: These probably don't belong in the modal file, but rather in their own 
	`form` directory with reusable inputs/form wrappers
*/
type FormField = {
  name: string;
  label: string;
  rules: RegisterOptions;
};

const ReferralFormFields: FormField[] = [
  {
    name: 'email',
    label: 'Label',
    rules: {
      required: { value: true, message: 'Please enter email' },
    },
  },
  {
    name: 'givenName',
    label: 'Given Name',
    rules: {
      required: { value: true, message: 'Please enter given name' },
    },
  },
  {
    name: 'surName',
    label: 'Surname',
    rules: {
      required: { value: true, message: 'Please enter surname' },
    },
  },
  {
    name: 'phone',
    label: 'Phone',
    rules: {
      required: { value: true, message: 'Please enter phone' },
    },
  },
];

interface ReferralModalProps {
  title: string;
  isOpen: boolean;
  submitText: string;
  controlRHF: Control;
  handleModalClose: () => void;
  onSubmit: SubmitHandler<Referral>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  handleSubmitRHF: UseFormHandleSubmit<ReferralFormValues>;
}

export const ReferralModal = ({
  title,
  isOpen,
  controlRHF,
  submitText,
  setValue,
  getValues,
  onSubmit,
  handleSubmitRHF,
  handleModalClose,
}: ReferralModalProps) => {
  const defaultAddressValue = getValues('addressLine');
  return (
    <Dialog open={isOpen} onClose={handleModalClose}>
      <form onSubmit={handleSubmitRHF(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <>
            {ReferralFormFields.map((field) => (
              <Input key={field.name} control={controlRHF} {...field} />
            ))}
            {/* TODO: Add validation for autocomplete */}
            {/* Temp workaround, should really add it automatically to the autocomplete */}
            <PlacesAutoComplete
              defaultValue={defaultAddressValue}
              onSelect={(value) => setValue('addressLine', value)}
            />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button type="submit">{submitText}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
