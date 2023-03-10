export const RDFHelpText = ({ helper }) => (
  <div className="instructions">
      {typeof helper === 'object' || typeof helper === 'string'
        ? helper
        : null
      }
      {typeof helper === 'function'
        ? helper()
        : null
      }
    </div>
);

export const RDFErrorMessage = ({ error }) => (
  <div className="instructions">
    {error && error.message > ''
      ? <span className="error-message">{error.message as string}</span>
      : null
    }
  </div>
);
