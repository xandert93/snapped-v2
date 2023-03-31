export const ConditionalWrapper = ({ condition, wrapper: Wrapper, children }) => {
  return condition ? Wrapper(children) : children;
};
