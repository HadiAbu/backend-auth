import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../config/db.js";
const JWT_secert = process.env.JWT || "fallback_secret";
export class AuthService {
    static async register(username, pass) {
        const passHash = await bcrypt.hash(pass, 10);
        const newUser = {
            id: crypto.randomUUID(),
            username: username,
            pass: passHash,
        };
        users.push(newUser);
        return newUser;
    }
    static async login(username, pass) {
        // find the user
        const user = users.find((u) => u.username == username);
        if (!user)
            return null;
        //validate pass
        const isValid = await bcrypt.compare(pass, user.pass);
        if (!isValid)
            return null;
        //return JWT payload
        const payload = { userId: user.id, username: user.username };
        return jwt.sign(payload, JWT_secert, { expiresIn: "1h" });
    }
}
//# sourceMappingURL=auth.service.js.map