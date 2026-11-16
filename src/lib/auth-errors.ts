interface AuthLikeError {
  message?: string;
  code?: string;
  status?: number;
}

/** Maps Supabase Auth errors to calm, clear messages for people. */
export function friendlyAuthError(error: unknown): string {
  const e = (error ?? {}) as AuthLikeError;
  const code = e.code ?? "";
  const msg = (e.message ?? "").toLowerCase();

  if (code === "invalid_credentials" || msg.includes("invalid login credentials"))
    return "That email and password don't match. Check them and try again.";
  if (code === "email_not_confirmed" || msg.includes("email not confirmed"))
    return "Please confirm your email first. Check your inbox for the link we sent.";
  if (code === "user_already_exists" || msg.includes("already registered"))
    return "An account with this email already exists. Try signing in instead.";
  if (code === "weak_password" || msg.includes("weak password") || msg.includes("password should"))
    return "Please choose a stronger password with letters and numbers.";
  if (code === "same_password" || msg.includes("different from the old"))
    return "Your new password must be different from your current one.";
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit" || e.status === 429)
    return "Too many attempts in a short time. Please wait a few minutes and try again.";
  if (code === "otp_expired" || msg.includes("expired") || msg.includes("invalid") && msg.includes("token"))
    return "This link has expired or was already used. Please request a new one.";
  if (code === "email_address_invalid")
    return "That email address can't be used. Please check it or try a different one.";
  if (code === "email_address_not_authorized")
    return "We can't send emails to this address yet. Please try a different email.";
  if (code === "signup_disabled") return "New registrations are currently closed.";
  if (msg.includes("failed to fetch") || msg.includes("network"))
    return "We can't reach DenseShade right now. Check your connection and try again.";
  return "Something went wrong. Please try again.";
}
