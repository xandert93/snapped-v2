const { format } = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

export const formatCurrency = (num) => format(num / 100);
