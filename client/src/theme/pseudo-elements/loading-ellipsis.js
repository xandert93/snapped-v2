export const loadingEllipsis = {
  '&:after': {
    content: "'\\2026'", // ascii code for the ellipsis character
    overflow: 'hidden',
    display: 'inline-block', // so we can dynamically set width
    verticalAlign: 'bottom',
    animation: '$ellipsis steps(4, end) 2000ms infinite',
  },
};
