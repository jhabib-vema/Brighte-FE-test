import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';
import { useAppContext } from '../../contexts';
import { Referral } from '../../types/referral';
import { useConfirm } from 'material-ui-confirm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFetchData, useModalState } from '../../hooks';
import { ReferralTable } from '../../components/ReferralTable';
import { ReferralModal } from '../../components/ReferralModal';
import { MappedResult } from '../../client/ApiClient';

export type ReferralFormValues = Referral;

const ReferralList: React.FC = () => {
  const confirm = useConfirm();
  const { apiClient } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const { data, fetchData } = useFetchData();
  const { isOpen, openModal, closeModal } = useModalState();
  const [trackedReferral, setTrackedReferral] = useState<Referral>();

  /* React-hook-form Props */
  const {
    reset: resetRHF,
    control: controlRHF,
    setValue: setValueRHF,
    getValues: getValuesRHF,
    handleSubmit: handleSubmitRHF,
  } = useForm({
    mode: 'onTouched',
    criteriaMode: 'firstError',
  });

  /* 
    Track referral for modal population
    Reset RHF on click
  */
  useEffect(() => {
    if (!trackedReferral) {
      resetRHF();
      return;
    }
    resetRHF({
      ...trackedReferral,
    });
  }, [trackedReferral]);

  /* Reusable Actions */
  const processRequest = (response: MappedResult<any>) => {
    if (response.type === 'success') {
      enqueueSnackbar('Success!', { variant: 'success' });
    } else {
      enqueueSnackbar('Error! Something went wrong', { variant: 'error' });
    }

    syncData();
  };

  const syncData = () => fetchData();

  const handleModalClose = () => {
    closeModal();
  };

  /* CRUD Actions */
  const handleEdit = (referral: Referral) => {
    setTrackedReferral(referral);
    openModal();
  };

  const handleDelete = async (data: Referral) => {
    const response = await apiClient.deleteReferral(data.id);
    processRequest(response);
    handleModalClose();
  };

  const handleDeleteConfirm = (data: Referral) => {
    confirm({ description: 'Are you sure you want to delete this item?' })
      .then(() => {
        handleDelete(data);
      })
      .catch(() => {
        handleModalClose();
      });
  };

  const onSubmit: SubmitHandler<ReferralFormValues> = async (data) => {
    let response;
    const actionType = data.id ? 'update' : 'create';

    if (actionType === 'update') {
      response = await apiClient.updateReferral(data.id, data);
    } else {
      response = await apiClient.createReferral(data);
    }

    processRequest(response);
    handleModalClose();
  };

  const handleAddNew = () => {
    // Reset RHF form values
    resetRHF({});
    setTrackedReferral(null);
    openModal();
  };

  const actionText = trackedReferral ? 'Update' : 'Create';

  return (
    <Box sx={{ p: '44px 0px' }}>
      <ReferralModal
        isOpen={isOpen}
        title={actionText}
        onSubmit={onSubmit}
        setValue={setValueRHF}
        getValues={getValuesRHF}
        submitText={actionText}
        controlRHF={controlRHF}
        handleSubmitRHF={handleSubmitRHF}
        handleModalClose={handleModalClose}
      />
      <ReferralTable onEdit={handleEdit} onDelete={handleDeleteConfirm} referrals={data} />
      {/* TODO: Create proper button variants using theme */}
      <Button sx={{ width: '100%', mt: 2, color: 'white' }} variant="contained" onClick={handleAddNew}>
        Add New
      </Button>
    </Box>
  );
};

export { ReferralList };
