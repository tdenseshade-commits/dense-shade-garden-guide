import { describe, expect, it } from "vitest";
import { simulateAnswer, simulateIdentify } from "@/lib/demo/assistant";

describe("simulated assistant", () => {
  it("identifies only from the given garden plants", () => {
    expect(["monstera", "basil"]).toContain(simulateIdentify("photo.jpg123", ["monstera", "basil"]).species.id);
  });
  it("returns no answer for unknown questions", () => {
    expect(simulateAnswer("qwerty zzz")).toBeNull();
  });
  it("matches lavender pruning question", () => {
    expect(simulateAnswer("how do I prune my lavender")?.speciesIds).toContain("lavender");
  });
});
