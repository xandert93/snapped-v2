export const Form = ({ onSubmit, ...props }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      autoComplete="off"
      spellCheck="false"
      {...props}
    />
  );
};
