import { z } from "zod";

export const calendarEventSchema = z.object({
  summary: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string().optional(),
  description: z.string().optional(),
});

export type CalendarEvent = z.infer<typeof calendarEventSchema>;
