// lib/api/api-error.ts

export type ApiErrorCode =
  | "UNAUTHENTICATED"
  | "INVALID_PAGINATION"
  | "FORBIDDEN"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL_SERVER_ERROR"
  | "INVALID_JSON"
  | "ROLE_ASSIGNMENT_FORBIDDEN"
  | "BAD_REQUEST"
  | "EMPLOYEE_ALREADY_EXISTS";

export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = "ApiError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// throw new ApiError(
//   404,
//   "NOT_FOUND",
//   "Employee not found",
// );

// throw new ApiError(
//   409,
//   "CONFLICT",
//   "An employee with this email already exists",
// );

// throw new ApiError(
//   403,
//   "FORBIDDEN",
//   "You do not have permission to perform this action",
// );