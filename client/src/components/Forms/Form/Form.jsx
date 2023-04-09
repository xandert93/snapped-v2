export const Form = ({ onSubmit, ...props }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      autoComplete="off"
      spellCheck="false"
      {...props}
    />
  );
};
