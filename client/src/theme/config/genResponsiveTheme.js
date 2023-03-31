import { responsiveFontSizes } from '@material-ui/core';

const fontConfig = {
  factor: 2,
  breakpoints: [
    // 'xs',
    // 'sm',
    'md',
    'lg',
    'xl',
  ],
  variants: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline',
  ],
};

export const genResponsiveTheme = (theme) => responsiveFontSizes(theme, fontConfig);
