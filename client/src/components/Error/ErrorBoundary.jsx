import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

export const ErrorBoundary = ({ children }) => {
  const handleError = (error, errorInfo) => {
    // same error passed to FallbackComponent which handles it anyway
  };

  const handleReset = () => {
    //perhaps update some state
  };

  return (
    <ReactErrorBoundary FallbackComponent={Fallback} onError={handleError} onReset={handleReset}>
      {children}
    </ReactErrorBoundary>
  );
};

const Fallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <h1>Something went wrong:</h1>
      <h2>Message: {error.message}</h2>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
