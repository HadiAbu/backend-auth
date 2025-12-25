import { User } from "../types/user.js";
export declare class AuthService {
    static register(username: string, pass: string): Promise<User>;
    static login(username: string, pass: string): Promise<string | null>;
}
//# sourceMappingURL=auth.service.d.ts.map