/*"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { CalendarEvent, calendarEventSchema } from "@/lib/types";
import ical from "ical-generator";

export async function extractEventsFromImages(
  images: string[],
): Promise<CalendarEvent[]> {
  const extractedEvents: CalendarEvent[] = [];

  for (const image of images) {
    try {
      const { object } = await generateObject({
        model: openai("gpt-4o-mini", { vision: true }),
        schema: z.array(calendarEventSchema),
        prompt:
          "Analyze this image and extract all events and their details. For each event, provide the summary, start and end times, location (if available), and a brief description. Format the start and end times as ISO 8601 strings. If exact times are not provided, make a reasonable guess based on the context.",
        images: [image],
      });

      extractedEvents.push(...object);
    } catch (error) {
      console.error("Error extracting events:", error);
    }
  }

  return extractedEvents;
}

export async function generateICSFile(
  events: CalendarEvent[],
): Promise<string> {
  const calendar = ical({ name: "Extracted Events" });

  events.forEach((event) => {
    calendar.createEvent({
      start: new Date(event.start),
      end: new Date(event.end),
      summary: event.summary,
      description: event.description,
      location: event.location,
    });
  });

  return calendar.toString();
}

*/
