import { addDays, format } from "date-fns";
import { describe, expect, it } from "vitest";
import { demo } from "@/lib/demo/store";

describe("care tasks", () => {
  it("snoozing moves a task to tomorrow", () => {
    demo.reset();
    const t = demo.get().tasks.find((x) => !x.completedAt)!;
    demo.snoozeTask(t.id, 1);
    expect(demo.get().tasks.find((x) => x.id === t.id)?.dueOn).toBe(format(addDays(new Date(), 1), "yyyy-MM-dd"));
  });
  it("completing a task adds it to care history", () => {
    demo.reset();
    const t = demo.get().tasks.find((x) => !x.completedAt)!;
    demo.completeTask(t.id);
    expect(demo.get().logs[0]?.taskId).toBe(t.id);
  });
});
