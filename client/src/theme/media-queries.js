import { breakpoints } from './config';

const { xs, sm, md, lg, xl } = breakpoints.values;

// xs: 0, - 'xs' key now means anything in the range of 0 - 576px and so forth
// sm: 576,
// md: 768,
// lg: 992,
// xl: 1200,

const isBetween = (key_1, key_2) => `@media (min-width:${key_1}px) and (max-width:${key_2}px)`;
const isMin = (key) => `@media (min-width:${key}px)`;
const isMax = (key) => `@media (max-width:${key}px)`;

export const isVPXs = isMax(sm); // inverse is isVPMinSm...

export const isVPSm = isBetween(sm, md);
export const isVPMinSm = isMin(sm); //inverse is isVPXs...
export const isVPMaxSm = isMax(md);

export const isVPMd = isBetween(md, lg);
export const isVPMinMd = isMin(md);
export const isVPMaxMd = isMax(lg);

export const isVPLg = isBetween(lg, xl);
export const isVPMinLg = isMin(lg);
export const isVPMaxLg = isMax(xl);

export const isVPXl = isMin(xl);
