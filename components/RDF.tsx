import React from 'react';
import { useRDFInternal } from './useRDF';
import type { RDFOptions } from './useRDF';
import { RDFTextField } from './RDFTextField';
import type {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  FieldErrors,
  Control
} from 'react-hook-form';
import { RDFCheckbox } from './RDFCheckbox';
import { RDFSelect } from './RDFSelect';
import { RDFRadio } from './RDFRadios';
import { RDFSwitch } from './RDFSwitch';
import { RDFMedia } from './RDFMedia';

export type RDFProps<T> = {
  options: RDFOptions
  onSubmit: (fd: FormData, data?: T) => void
  submitButtonLabel?: string
}

export type RDFFieldProps = {
  name: string
  label?: string
  helper?: string | (() => JSX.Element)
  // react hook form
  register?: UseFormRegister<FieldValues>
  options: RegisterOptions
  errors: FieldErrors
}

export type RDFControlledInputProps = RDFFieldProps & {
  control: Control<FieldValues, unknown>
}

/**
 *
 * @props options for rendering the form declaratively {@link RDFProps}
 * @returns The RDF form component based on options configuration
 */
export function RDF<T>({
  options,
  onSubmit,
  submitButtonLabel = 'Send it'
}: RDFProps<T>) {
  const {
    fields,
    register,
    errors,
    control,
    handleSubmit: rhfSubmitHandler,
    handleSubmitWithFormData
  } = useRDFInternal<T>(options, onSubmit);

  return (
    <form onSubmit={rhfSubmitHandler(handleSubmitWithFormData)}>
      {fields.map((field, index) => {
        switch (field.type) {
          // text field
          case 'text':
          case 'multiline':
            return (
              <RDFTextField
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                register={register}
                options={field.options}
                multiline={field.type === 'multiline'}
                helper={field.helpText || field.HelpText}
                errors={errors}
              />
            );
          // text field
          case 'media':
            return (
              <RDFMedia
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                control={control}
                options={field.options}
                helper={field.helpText || field.HelpText}
                previewType={field.previewType}
                errors={errors}
              />
            );
          // checkbox
          case 'checkbox':
            return (
              <RDFCheckbox
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                control={control}
                register={register}
                options={field.options}
                helper={field.helpText || field.HelpText}
                errors={errors}
              />
            );
          // switch
          case 'switch':
            return (
              <RDFSwitch
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                control={control}
                register={register}
                options={field.options}
                helper={field.helpText || field.HelpText}
                errors={errors}
              />
            );
          // select
          case 'select':
            return (
              <RDFSelect
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                control={control}
                register={register}
                options={field.options}
                choices={field.choices}
                placeholder={field.placeholder}
                helper={field.helpText || field.HelpText}
                errors={errors}
              />
            );
          // radio
          case 'radio':
            return (
              <RDFRadio
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                control={control}
                register={register}
                options={field.options}
                choices={field.choices}
                placeholder={field.placeholder}
                helper={field.helpText || field.HelpText}
                errors={errors}
              />
            );
        }
      })}
      <button type="submit" className="submit">{submitButtonLabel}</button>
    </form>
  );
}
