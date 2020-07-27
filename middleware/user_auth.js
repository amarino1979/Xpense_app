//middleware for verifying the token...
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No  token, access denied." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.status(401).json({ msg: "Verification token failed, access denied." });
console.log(verified)
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;

//worked through MERN auth tutorial on https://youtu.be/BKiiXXVb69Y and https://github.com/jgbijlsma/mern-auth-template-back/blob/master/routes/userRouter.js