import { verify } from "jsonwebtoken";

export function verifyToken(token: string) {
    return verify(token, "12345");
}