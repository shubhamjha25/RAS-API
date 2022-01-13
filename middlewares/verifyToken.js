const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json("Token Invalid");
                req.user = user;
                next();
        });
    } 
    else {
        return res.status(401).json("You Are Not Authenticated");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You Are Not Authorized");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You Are Not Authorized");
        }
    });
};

const verifyTokenAndStaff = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isStaff) {
            next();
        } else {
            res.status(403).json("You Are Not Authorized");
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndStaff };