import jwt from "jsonwebtoken";
import { User, JWTpayload } from "../types/user.js";
import bcrypt from "bcryptjs";
import { users } from "../config/db.js";

const JWT_secert: string = process.env.JWT || "fallback_secret";

export class AuthService {
  static async register(username: string, pass: string): Promise<User> {
    const passHash = await bcrypt.hash(pass, 10);
    const newUser: User = {
      id: crypto.randomUUID(),
      username: username,
      pass: passHash,
    };
    users.push(newUser);
    return newUser;
  }
  static async login(username: string, pass: string): Promise<string | null> {
    // find the user
    const user = users.find((u) => u.username == username);
    if (!user) return null;

    //validate pass
    const isValid = await bcrypt.compare(pass, user.pass);
    if (!isValid) return null;

    //return JWT payload
    const payload: JWTpayload = { userId: user.id, username: user.username };
    return jwt.sign(payload, JWT_secert, { expiresIn: "1h" });
  }
}
