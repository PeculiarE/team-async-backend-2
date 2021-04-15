import { verifyToken } from '../utils';

const authenticate = (req, res, next) => {
  console.log('auth', req.body);
  try {
    const { authorization } = req.headers;
    console.log({ authorization });
    console.log(authorization);
    const token = authorization.split(' ')[1];
    const { err, data } = verifyToken(token);
    console.log('auth', token);
    if (err) {
      console.log(err);
      return res
        .status(401)
        .json({ status: 'Fail', message: 'You need to be signed in' });
    }
    req.entrant = data;
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 'Fail', message: 'Something went wrong' });
  }
};

export default authenticate;
