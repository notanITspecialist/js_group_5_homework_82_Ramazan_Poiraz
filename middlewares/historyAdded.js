const User = require('../models/user');


module.exports = async (req, res, next) => {
  const reqToken = await req.get('Authorization');
  const [type, token] = reqToken.split(' ');

  const user = await User.findOne({token});

  if(type !== 'Token' || !user) return res.status(401).send({error: 'Unauthorized'});

  req.userId = user._id.toString();

  next();
};