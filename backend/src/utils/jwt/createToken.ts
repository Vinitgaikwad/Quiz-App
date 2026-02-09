import { sign } from "jsonwebtoken";

export function createToken(obj: any) {
    return sign(obj, "12345")
}