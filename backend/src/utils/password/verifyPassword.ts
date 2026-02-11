import { compare } from "bcrypt"

export async function verifyPassword(password: string, hash: string) {
    return await compare(password, hash)
}