import { useId } from 'react';

import Button from '@mui/material/Button';

function UploadFileButton(props) {
  const inputId = useId();

  return (
    <>
      <input
        id={inputId}
        style={{ display: 'none' }}
        type="file"
        accept="application/json"
        onChange={props.handleLoadFileInput}
      />
      <label htmlFor={inputId}>
        <Button
          sx={{ whiteSpace: 'nowrap' }}
          variant="outlined"
          component="span"
          disabled={props.isLoading || props.disabled}
          fullWidth
          onClick={props.handleLoadFileReset}
        >{props.buttonLabel}</Button>
      </label>
    </>
  );
}

export default UploadFileButton;