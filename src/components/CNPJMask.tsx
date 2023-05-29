import { ChangeEvent } from 'react';
import InputMask from 'react-input-mask';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type CNPJMaskProps = TextFieldProps & {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function CNPJMask({ value, onChange, error, helperText, ...rest }: CNPJMaskProps) {
  const renderInput = (inputProps: any) => (
    <TextField
      {...inputProps}
      margin="normal"
      required
      fullWidth
      id="cnpj"
      label="CNPJ"
      name="cnpj"
      autoComplete="cnpj"
      error={error}
      helperText={helperText}
      {...rest}
    />
  );

  return (
    <InputMask
      mask="99.999.999/9999-99"
      value={value}
      onChange={onChange}
      maskPlaceholder={null}
      children={renderInput}
    />
  );
}
