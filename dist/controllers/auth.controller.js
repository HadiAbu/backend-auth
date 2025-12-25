import { AuthService } from "../services/auth.service.js";
import redisClient from "../config/redis.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const { username, pass } = req.body;
        if (!username || !pass)
            return res.status(400).json({ message: "creds missing" });
        const user = await AuthService.register(username, pass);
        res.status(201).json({ message: `created new user: ${username}` });
    }
    catch (e) {
        return res.status(500).json({ message: "server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { username, pass } = req.body;
        const token = await AuthService.login(username, pass);
        if (!token)
            return res.status(400).json({ message: "invalid username or pass" });
        res.status(200).json({ token });
        res.end();
    }
    catch (e) {
        return res.status(500).json({ message: "server error" });
    }
};
// to logout means, to invalidate the JWT token, we do this by adding the token to the blacklisted list
export const logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (token) {
        try {
            // Decode the token to find out when it expires
            const decoded = jwt.decode(token);
            const expiry = decoded.exp; // Unix timestamp
            const now = Math.floor(Date.now() / 1000);
            const secondsLeft = expiry - now;
            if (secondsLeft > 0) {
                // Store in Redis with an expiration time
                // Key: "blacklist:<token>", Value: "true"
                await redisClient.setEx(`blacklist:${token}`, secondsLeft, "true");
            }
        }
        catch (error) {
            return res.status(400).json({ message: "Invalid token" });
        }
    }
    res.status(200).json({ message: "Logged out successfully" });
};
//# sourceMappingURL=auth.controller.js.map