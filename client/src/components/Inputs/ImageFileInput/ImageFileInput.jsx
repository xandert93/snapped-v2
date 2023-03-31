import useStyles from './styles';

export const ImageFileInput = ({ id, hidden, ...props }) => {
  const classes = useStyles({ hidden });
  return (
    <>
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        id={id} // 1
        value=""
        hidden={hidden}
        {...props}
      />
      <label
        htmlFor={id} // 1
        className={classes['file-input-label']}
      />
    </>
  );
};

/* 

1) `id` must be unique for each use

empty "" value on <input> enables clean value after every file selection. Useful if user tries
to select the same file again. Otherwise, onChange would not run again, 
causing unexpected behaviour. 


*/
