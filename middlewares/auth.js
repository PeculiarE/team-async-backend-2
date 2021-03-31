import { verifyToken } from '../utils';

const authenticate = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ status: 'Fail', message: 'You need to be signed in' });
    }
    const token = authorization.split(' ')[1];
    const { err, data } = verifyToken(token);
    if (err) {
      return res
        .status(401)
        .json({ status: 'Fail', message: 'You need to be signed in' });
    }
    req.entrant = data;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'Fail', message: 'Something went wrong' });
  }
};

export default authenticate;
