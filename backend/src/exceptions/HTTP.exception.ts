import AppError from "./app.exception.js";

export class NotFoundException extends AppError{
    constructor(message: string='Not Found'){
        super(message, 404);
    }
}

export class BadRequestException extends AppError{
    constructor(message: string='Bad Request'){
        super(message, 400);
    }
}

export class UnauthorizedException extends AppError{
    constructor(message: string='Access Denied'){
        super(message, 401);
    }
}

export class ForbiddenException extends AppError{
    constructor(message: string='Forbidden'){
        super(message, 403);
    }
}


