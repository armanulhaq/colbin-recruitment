import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        { email: user.email, name: user.name },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
