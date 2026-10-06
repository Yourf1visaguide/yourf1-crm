import { ApiClientError } from "./api-client-response";

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ApiSuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

export async function apiFetch<T>( input: RequestInfo | URL, init?: RequestInit, ): Promise<ApiSuccessResponse<T>> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new Error(
      `Request failed with status ${response.status}`,
    );
  }

  if (!response.ok) {
    const errorBody = body as Partial<ApiErrorResponse>;

    throw new ApiClientError(
      errorBody.error?.message ??
        `Request failed with status ${response.status}`,
      errorBody.error?.code ?? "UNKNOWN_ERROR",
      response.status,
      errorBody.error?.details,
    );
  }

  return body as ApiSuccessResponse<T>;
}
