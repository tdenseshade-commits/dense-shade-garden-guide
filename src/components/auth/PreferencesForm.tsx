import { useState, type FormEvent } from "react";

import { ChoiceGroup } from "@/components/forms/ChoiceGroup";
import { FormField } from "@/components/forms/FormField";
import { FormMessage } from "@/components/forms/FormMessage";
import { NativeSelect } from "@/components/forms/NativeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fieldErrors, preferencesSchema, type Preferences, type PreferencesInput } from "@/lib/auth-schemas";
import { friendlyAuthError } from "@/lib/auth-errors";
import type { Profile } from "@/lib/profile";
import {
  CALIFORNIA_REGIONS,
  EXPERIENCE_LEVELS,
  EXPLANATION_LEVELS,
  type ExperienceLevel,
  type ExplanationLevel,
} from "@/lib/profile-options";

interface PreferencesFormProps {
  initial?: Profile | null;
  submitLabel: string;
  onSubmit: (prefs: Preferences) => Promise<void>;
}

/** The four onboarding questions; reused on Profile to edit preferences. */
export function PreferencesForm({ initial, submitLabel, onSubmit }: PreferencesFormProps) {
  const [values, setValues] = useState<PreferencesInput>({
    displayName: initial?.display_name ?? "",
    region: initial?.growing_region ?? "",
    experience: (initial?.experience_level ?? "") as ExperienceLevel,
    explanation: (initial?.explanation_level ?? "") as ExplanationLevel,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof PreferencesInput>(key: K, value: PreferencesInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = preferencesSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setSaving(true);
    try {
      await onSubmit(parsed.data);
    } catch (err) {
      setFormError(friendlyAuthError(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Display name (optional)" hint="What should we call you?" error={errors["displayName"]}>
        <Input
          value={values.displayName}
          onChange={(e) => set("displayName", e.target.value)}
          autoComplete="nickname"
          maxLength={60}
          placeholder="e.g. Sam"
        />
      </FormField>

      <FormField
        label="California growing region"
        hint="Helps us suit care to your climate."
        error={errors["region"]}
      >
        <NativeSelect value={values.region} onChange={(e) => set("region", e.target.value)}>
          <option value="" disabled>
            Choose your region
          </option>
          {CALIFORNIA_REGIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </NativeSelect>
      </FormField>

      <ChoiceGroup
        legend="Gardening experience"
        name="experience"
        options={EXPERIENCE_LEVELS}
        value={values.experience}
        onChange={(v) => set("experience", v)}
        error={errors["experience"]}
      />

      <ChoiceGroup
        legend="How should we explain things?"
        name="explanation"
        options={EXPLANATION_LEVELS}
        value={values.explanation}
        onChange={(v) => set("explanation", v)}
        error={errors["explanation"]}
      />

      {formError && <FormMessage tone="error">{formError}</FormMessage>}

      <Button type="submit" size="lg" className="w-full" disabled={saving}>
        {saving ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
