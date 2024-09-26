"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  Calendar,
  Send,
  Plus,
  Clock,
  FileText,
  Download,
  Mail,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const recentActivity = [
  {
    id: 1,
    type: "upload",
    description: "Uploaded schedule image",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "event",
    description: 'Created "Team Meeting" event',
    time: "1 day ago",
  },
  {
    id: 3,
    type: "event",
    description: 'Modified "Project Deadline" event',
    time: "3 days ago",
  },
];

const upcomingEvents = [
  { id: 1, name: "Team Meeting", date: "2023-05-16", time: "10:00 AM" },
  { id: 2, name: "Project Deadline", date: "2023-05-18", time: "5:00 PM" },
  { id: 3, name: "Client Presentation", date: "2023-05-20", time: "2:00 PM" },
];

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const handleQuickCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement event creation logic
    console.log("Creating event:", { eventName, eventDate, eventTime });
    setIsDialogOpen(false);
    setEventName("");
    setEventDate("");
    setEventTime("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Quick Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Quickly add a new event to your calendar.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleQuickCreate} className="space-y-4">
              <div>
                <Label htmlFor="event-name">Event Name</Label>
                <Input
                  id="event-name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter event name"
                />
              </div>
              <div>
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
              <Button type="submit">Create Event</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <UploadCloud className="mr-2" />
              Uploads
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold">23/50</p>
            <p className="text-sm mt-2">Remaining</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Calendar className="mr-2" />
              Events
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold">142</p>
            <p className="text-sm mt-2">Created</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Send className="mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold">89/100</p>
            <p className="text-sm mt-2">Sent</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">{event.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.date}, {event.time}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      ICS
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      SMS
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  {activity.type === "upload" ? (
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  ) : (
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                  )}
                  <span className="flex-1">{activity.description}</span>
                  <span className="text-sm text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
