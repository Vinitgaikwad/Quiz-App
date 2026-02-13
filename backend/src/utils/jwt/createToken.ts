import { sign } from "jsonwebtoken";

export function createToken(obj: any, time: string = "") {
    if (time) {
        return sign(obj, "12345", { expiresIn: "1hr" })
    }
    return sign(obj, "12345")
}