import { describe, expect, it } from "vitest";

import { preferencesSchema, signInSchema, signUpSchema, resetPasswordSchema } from "@/lib/auth-schemas";
import { friendlyAuthError } from "@/lib/auth-errors";
import { CALIFORNIA_REGIONS, EXPERIENCE_LEVELS, EXPLANATION_LEVELS } from "@/lib/profile-options";

describe("Registration rules", () => {
  it("rejects passwords shorter than 8 characters", () => {
    expect(signUpSchema.safeParse({ email: "a@b.co", password: "abc123", confirmPassword: "abc123" }).success).toBe(false);
  });
  it("rejects mismatched password confirmation", () => {
    expect(signUpSchema.safeParse({ email: "a@b.co", password: "garden123", confirmPassword: "garden124" }).success).toBe(false);
  });
  it("accepts a valid email with an 8+ character letter-and-number password", () => {
    expect(signUpSchema.safeParse({ email: "a@b.co", password: "garden123", confirmPassword: "garden123" }).success).toBe(true);
  });
  it("rejects an invalid email at sign in", () => {
    expect(signInSchema.safeParse({ email: "not-an-email", password: "x" }).success).toBe(false);
  });
  it("applies the same password rule when resetting", () => {
    expect(resetPasswordSchema.safeParse({ password: "short1", confirmPassword: "short1" }).success).toBe(false);
  });
});

describe("Onboarding preferences", () => {
  const valid = { displayName: "", region: "bay_area", experience: "beginner", explanation: "simple" };

  it("display name is optional and blank becomes empty", () => {
    const r = preferencesSchema.safeParse(valid);
    expect(r.success && r.data.displayName).toBe(null);
  });
  it("requires a California growing region from the list", () => {
    expect(preferencesSchema.safeParse({ ...valid, region: "" }).success).toBe(false);
    expect(preferencesSchema.safeParse({ ...valid, region: "texas" }).success).toBe(false);
  });
  it("offers exactly Beginner, Intermediate and Advanced experience", () => {
    expect(EXPERIENCE_LEVELS.map((l) => l.label)).toEqual(["Beginner", "Intermediate", "Advanced"]);
  });
  it("offers exactly Simple, Standard and Advanced explanations", () => {
    expect(EXPLANATION_LEVELS.map((l) => l.label)).toEqual(["Simple", "Standard", "Advanced"]);
  });
  it("region codes match the database list", () => {
    expect(CALIFORNIA_REGIONS.map((r) => r.value).sort()).toEqual(
      ["bay_area", "central_coast", "central_valley", "desert", "far_north", "inland_southern", "north_coast", "sierra_foothills", "southern_coast"],
    );
  });
});

describe("Auth error messages", () => {
  it("explains wrong credentials clearly", () => {
    expect(friendlyAuthError({ code: "invalid_credentials" })).toMatch(/don't match/);
  });
  it("explains unconfirmed email", () => {
    expect(friendlyAuthError({ code: "email_not_confirmed" })).toMatch(/confirm your email/);
  });
});

describe("Rejected email addresses", () => {
  it("explains an unusable email instead of a generic error", () => {
    expect(friendlyAuthError({ code: "email_address_invalid" })).toMatch(/can't be used/);
  });
});
