interface SuccessResponse<T = any> {
  error: boolean;
  msg: string;
  data: T;
}

interface ErrorResponse {
  error: boolean;
  msg: string;
}

export const createSuccessResponse = <T>(
  msg: string,
  data: T
): SuccessResponse<T> => {
  return {
    error: false,
    msg,
    data
  };
};

export const createErrorResponse = (msg: string): ErrorResponse => {
  return {
    error: true,
    msg
  };
};