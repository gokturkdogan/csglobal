export type AdminActionResult = {
  ok: boolean;
  message: string;
  redirectTo?: string;
};

export function adminSuccess(message: string, redirectTo?: string): AdminActionResult {
  return { ok: true, message, redirectTo };
}

export function adminFailure(message: string): AdminActionResult {
  return { ok: false, message };
}

export function adminErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return fallback;
}
