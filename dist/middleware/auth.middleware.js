import jwt from "jsonwebtoken";
const JWT_secert = process.env.JWT || "fallback_secret";
export const authenticate = (req, res, next) => {
    const requestHeader = req.headers.authorization;
    if (!requestHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "unauthorized: token not valid" });
    }
    const token = requestHeader.split(" ")[1];
    try {
        req.user = token && jwt.verify(token, JWT_secert);
        next();
    }
    catch (e) {
        return res.status(403).json({ message: "forbidden, cannot authorize" });
    }
};
//# sourceMappingURL=auth.middleware.js.map