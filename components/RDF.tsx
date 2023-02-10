import React from 'react';
import { useRDF } from './useRDF';
import type { RDFOptions } from './useRDF';
import { RDFTextField } from './RDFTextField';
import type { UseFormRegister, FieldValues, RegisterOptions, FieldErrors } from "react-hook-form"
import { RDFCheckbox } from './RDFCheckbox';

export type RDFProps<T> = {
  options: RDFOptions
  submitButtonLabel: string
  handleSubmit: (data: T) => void | T
}

export type RDFFieldProps = {
  name: string
  label?: string
  helper?: string | (() => JSX.Element)
  // react hook form
  register: UseFormRegister<FieldValues>
  options: RegisterOptions
  errors: FieldErrors
}

/**
 *
 * @props options for rendering the form declaratively {@link RDFProps}
 * @returns The RDF form component based on options configuration
 */
export function RDF<T>({
  options,
  handleSubmit,
  submitButtonLabel
}: RDFProps<T>) {
  const {
    fields,
    register,
    errors,
    // watch,
    handleSubmit: rhfSubmitHandler
  } = useRDF(options)

  return (
    <form onSubmit={rhfSubmitHandler(handleSubmit)}>
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
                errors={errors}
                multiline={field.type === 'multiline'}
                helper={field.helpText || field.HelpText}
              />
            )
          case 'checkbox':
            return (
              <RDFCheckbox
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}

                register={register}
                options={field.options}
                errors={errors}

                helper={field.helpText || field.HelpText}
              />
            )
        }
      })}
      <button type="submit" className="submit">{submitButtonLabel}</button>
    </form>
  )
}
