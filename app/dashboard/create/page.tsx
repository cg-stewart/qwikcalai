"use client";

import { useState } from "react";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import ical from "ical-generator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OpenAI from "openai/index.mjs";

// Define the schema for our calendar event
const calendarEventSchema = z.object({
  summary: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string().optional(),
  description: z.string().optional(),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type CalendarEvent = z.infer<typeof calendarEventSchema>;

export default function CalendarEventExtractor() {
  const [files, setFiles] = useState<File[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const extractEvents = async () => {
    setLoading(true);
    const extractedEvents: CalendarEvent[] = [];

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise<void>((resolve) => {
        reader.onload = async () => {
          const base64Image = reader.result as string;

          try {
            const completion = await openai.beta.chat.completions.parse({
              model: "gpt-4o-2024-08-06",
              messages: [
                {
                  role: "system",
                  content:
                    "You are an AI assistant that extracts calendar event information from images. Please analyze the image and provide the event details in the required format.",
                },
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: "Please extract the calendar event information from this image:",
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: base64Image,
                        detail: "high",
                      },
                    },
                  ],
                },
              ],
              response_format: zodResponseFormat(
                z.array(calendarEventSchema),
                "calendar_events",
              ),
            });

            const extractedEventsFromImage =
              completion.choices[0].message.parsed;
            if (Array.isArray(extractedEventsFromImage)) {
              extractedEvents.push(...extractedEventsFromImage);
            } else {
              console.warn(
                "Unexpected response format:",
                extractedEventsFromImage,
              );
            }
          } catch (error) {
            console.error("Error extracting events:", error);
          }

          resolve();
        };
      });
    }

    setEvents(extractedEvents);
    setLoading(false);
  };

  const handleEventChange = (
    index: number,
    field: keyof CalendarEvent,
    value: string,
  ) => {
    const updatedEvents = [...events];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    setEvents(updatedEvents);
  };

  const generateICS = () => {
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

    const icsString = calendar.toString();
    const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "events.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calendar Event Extractor</h1>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        className="mb-4"
      />
      <Button
        onClick={extractEvents}
        disabled={files.length === 0 || loading}
        className="mb-4"
      >
        {loading ? "Extracting..." : "Extract Events"}
      </Button>
      {events.length > 0 && (
        <>
          <div className="mb-4">
            {events.map((event, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>{event.summary}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details">
                      <AccordionTrigger>Event Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor={`summary-${index}`}>Summary</Label>
                            <Input
                              id={`summary-${index}`}
                              value={event.summary}
                              onChange={(e) =>
                                handleEventChange(
                                  index,
                                  "summary",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`start-${index}`}>Start</Label>
                            <Input
                              id={`start-${index}`}
                              value={event.start}
                              onChange={(e) =>
                                handleEventChange(
                                  index,
                                  "start",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`end-${index}`}>End</Label>
                            <Input
                              id={`end-${index}`}
                              value={event.end}
                              onChange={(e) =>
                                handleEventChange(index, "end", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`location-${index}`}>
                              Location
                            </Label>
                            <Input
                              id={`location-${index}`}
                              value={event.location || ""}
                              onChange={(e) =>
                                handleEventChange(
                                  index,
                                  "location",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`description-${index}`}>
                              Description
                            </Label>
                            <Input
                              id={`description-${index}`}
                              value={event.description || ""}
                              onChange={(e) =>
                                handleEventChange(
                                  index,
                                  "description",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button onClick={generateICS}>Generate ICS File</Button>
        </>
      )}
    </div>
  );
}
