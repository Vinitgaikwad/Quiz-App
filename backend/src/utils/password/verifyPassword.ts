import { compare } from "bcrypt"

export function verifyPassword(password: string, hash: string) {
    return compare(password, hash)
}