import React from 'react';
import { Label } from '@radix-ui/react-label';
import { RDFFieldProps } from './RDF';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';

export type RDFTextFieldProps = RDFFieldProps & {
  placeholder?: string
  multiline?: boolean
}

/**
 *
 * @props see {@link RDFTextFieldProps}
 * @returns field with given options
 */
export const RDFTextField = ({
  name,
  label,
  placeholder,
  helper,
  options,
  register,
  errors,
  multiline,
  disabled,
  hidden
}: RDFTextFieldProps) => {
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  return (
    <div className={`field text-input field-${name} ${disabled ? 'text-disabled' : ''} ${hidden ? 'text-hidden' : ''}`}>
      <Label className={labelClasses.join(' ')} htmlFor={name}>
        {label}
      </Label>
      {multiline
        ? <textarea
            className={['input-multiline', ...inputClasses].join(' ')}
            id={name}
            placeholder={placeholder}
            {...register(name, options)}
            disabled={disabled as boolean}
          />
        : <input
            className={inputClasses.join(' ')}
            type="text" id={name}
            placeholder={placeholder}
            {...register(name, options)}
            disabled={disabled as boolean}
          />
      }
      <RDFErrorMessage error={error} />
      <RDFHelpText helper={helper} />
    </div>
  );
};
