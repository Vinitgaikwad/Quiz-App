import { prisma } from "@/db";
import type { UserCredType } from "./auth.schema";
import { createToken, hashPassword, verifyPassword } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { AuthenticationError, ResourceConflict } from "@/errors/custom.errors";

export async function signUpHandler(userObj: UserCredType) {
    try {
        const { username, password } = userObj;

        const hash = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                username,
                password: hash
            }
        });

        return user;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            throw new ResourceConflict("Username Taken");
        }
        throw error;
    }
}


export async function signInHandler(userObj: UserCredType) {
    try {
        const { username, password } = userObj;

        const findUser = await prisma.user.findFirst({
            where: {
                username,
            }
        });

        if (!findUser) {
            throw new AuthenticationError("Invalid Credentials");
        }

        const verifyPwd = await verifyPassword(password, findUser.password);

        if (!verifyPwd) {
            throw new AuthenticationError("Incorrect Username or Password");
        }

        return createToken({ username: findUser.username, userID: findUser.id, role: findUser.role })

    } catch (error) {
        throw error
    }
}
