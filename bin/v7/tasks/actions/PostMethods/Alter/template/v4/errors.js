class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends AppError { }
class NotFoundError extends AppError { }

class ConflictError extends AppError { }
class StorageError extends AppError { }

export {
    AppError,
    ValidationError,
    NotFoundError,
    ConflictError,
    StorageError
};