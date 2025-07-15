export function isErrorResponse(err: unknown): err is ErrorResponse {
  return (err as ErrorResponse)?.error !== undefined
}
