import { AuthService } from "../services/auth.service.js";
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
    }
    catch (e) {
        return res.status(500).json({ message: "server error" });
    }
};
//# sourceMappingURL=auth.controller.js.map