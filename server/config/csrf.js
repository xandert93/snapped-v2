import csrf from 'csurf';

export const csrfProtection = () =>
  csrf({
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  });

export const getCSRFToken = (req, res) => {
  const genCSRFToken = req.csrfToken;
  const token = genCSRFToken();

  res.json({ token });
};
