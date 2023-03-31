import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '../../../../components/Buttons';
import { openDropDown } from '../../state/ui-slice';

// passed a

export const DropDownManagerButton = forwardRef(({ id, ...props }, ref) => {
  const dispatch = useDispatch();

  return (
    <IconButton
      ref={ref} // 1
      onClick={(e) => dispatch(openDropDown({ id, element: e.currentTarget }))}
      {...props}
    />
  );
});

// 1) <Tooltip> expects to pass a ref to it
