"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mockEvents = [
  {
    id: 1,
    name: "Team Meeting",
    date: "2023-05-16",
    time: "10:00 AM",
    description: "Weekly team sync-up",
  },
  {
    id: 2,
    name: "Project Deadline",
    date: "2023-05-18",
    time: "5:00 PM",
    description: "Submit final project deliverables",
  },
  {
    id: 3,
    name: "Client Presentation",
    date: "2023-05-20",
    time: "2:00 PM",
    description: "Present Q2 results to the client",
  },
  {
    id: 4,
    name: "Team Lunch",
    date: "2023-05-22",
    time: "12:30 PM",
    description: "Monthly team bonding lunch",
  },
  {
    id: 5,
    name: "Product Launch",
    date: "2023-05-25",
    time: "9:00 AM",
    description: "Launch of our new product line",
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
    setSelectedDate(null);
  };

  const getEventsForDate = (date: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    return mockEvents.filter((event) => event.date === dateString);
  };

  const handleDateClick = (date: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    setSelectedDate(dateString);
  };

  const selectedEvents = selectedDate
    ? mockEvents.filter((event) => event.date === selectedDate)
    : [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Calendar</h1>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Button onClick={prevMonth} variant="outline">
              <ChevronLeft className="mr-2" /> Previous
            </Button>
            <h2 className="text-2xl font-semibold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <Button onClick={nextMonth} variant="outline">
              Next <ChevronRight className="ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-500"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const date = index + 1;
              const events = getEventsForDate(date);
              const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
              return (
                <Card
                  key={date}
                  className={`p-2 cursor-pointer transition-colors ${events.length > 0 ? "bg-purple-50" : ""} ${selectedDate === dateString ? "ring-2 ring-purple-500" : ""}`}
                  onClick={() => handleDateClick(date)}
                >
                  <CardContent className="p-0">
                    <div className="text-right font-medium">{date}</div>
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs mt-1 truncate bg-purple-200 p-1 rounded"
                      >
                        {event.name}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card className="w-full mt-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Events for {selectedDate}
            </h3>
            {selectedEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedEvents.map((event) => (
                  <div key={event.id} className="border-b pb-4 last:border-b-0">
                    <h4 className="font-semibold">{event.name}</h4>
                    <p className="text-sm text-gray-600">{event.time}</p>
                    <p className="mt-2">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No events scheduled for this day.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
