import { ErrorTypes } from "@/types";

export class AppError extends Error {
    errorCode: ErrorTypes;

    constructor(message: string, errorCode: ErrorTypes) {
        super(message);
        this.errorCode = errorCode;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFound extends AppError {
    constructor(message = "Resource Not Found") {
        super(message, ErrorTypes.NotFound);
    }
}

export class InternalError extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, ErrorTypes.InternalError);
    }
}

export class ResourceConflict extends AppError {
    constructor(message = "Resource cannot be created") {
        super(message, ErrorTypes.ResourceConflict);
    }
}

export class AuthenticationError extends AppError {
    constructor(message = "Authentication Failed") {
        super(message, ErrorTypes.AuthenticationError);
    }
}
