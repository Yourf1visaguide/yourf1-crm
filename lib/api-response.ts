import "server-only";

import { ZodError } from "zod";
import { ApiError } from "@/lib/api-error";

type SuccessOptions = {
  message?: string;
  status?: number;
};

type ErrorBody = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

export function successResponse<T>( data: T, options: SuccessOptions = {}, ): Response {
  const { message, status = 200 } = options;

  return Response.json(  { success: true, ...(message !== undefined ? { message } : {}), data, }, 
    { status, headers: JSON_HEADERS, }, );
}

export function errorResponse( error: ErrorBody["error"], status: number, ): Response {
  return Response.json( { success: false, error, } satisfies ErrorBody, 
    { status, headers: JSON_HEADERS, },
  );
}

export function handleApiError(error: unknown): Response {
  if (error instanceof ApiError) {
    return errorResponse(
      {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined
          ? { details: error.details }
          : {}),
      },
      error.status,
    );
  }

  if (error instanceof ZodError) {
    return errorResponse(
      {
        code: "VALIDATION_ERROR",
        message: "Please check the submitted data.",
        details: error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      },
      400,
    );
  }

  console.error("Unhandled API error:", error);

  return errorResponse(
    {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
    },
    500,
  );
}


// example 
// 
//     return successResponse(employee, {
//       message: "Employee created successfully.",
//       status: 201,
//     });
//  


//     return error example
//     return handleApiError(error);
//   
