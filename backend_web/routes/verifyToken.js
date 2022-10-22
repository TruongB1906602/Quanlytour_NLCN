const jwt = require("jsonwebtoken");
const User  =require("../models/User");
const Role = require("../models/Role");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  }
  else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin || req.user.Tourguide) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
const CheckLogin = async(req, res, next) => {
  try {
    const id =  req.user.id;
    const user = await User.findById(id);
    if(user) {
      req.userId = id;
      next();
    }else return res.status(403).json("You are not logging in!");
  }catch(e) {
    return res.status(403).json("Error Server Error: " + e.message)
  }
}
const CheckRoleAdmin = async(req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roleUser = await Role.findById(user.roleId);
      console.log("Check Role");
      if (roleUser.roleValue === 2) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    } catch(e) {
      return res.status(403).json("You are not alowed to do that!");
    }
};
const checkRoleTourGuide = async(req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roleUser = await Role.findById(user.roleId);
    
    if (roleUser.roleValue >= 1) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  } catch(e) {
    return res.status(403).json("You are not alowed to do that!");
  }
}
const checkRoleCustomer = async(req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roleUser = await Role.findById(user.roleId);    
    if (roleUser.roleValue >= 0) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  } catch(e) {
    return res.status(403).json("You are not alowed to do that!");
  }
}
const verifyTokenAndTourguide = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.Tourguide) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  CheckLogin,
  CheckRoleAdmin,
  checkRoleTourGuide,
  checkRoleCustomer,
  verifyTokenAndTourguide,
}