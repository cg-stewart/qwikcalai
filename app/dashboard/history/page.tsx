"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Mail, MessageSquare, Calendar } from "lucide-react";
import Image from "next/image";

const mockHistoryData = [
  {
    id: 1,
    date: "2023-05-15",
    image: "/placeholder.svg",
    eventCount: 3,
    events: [
      { id: 1, name: "Team Meeting", date: "2023-05-16", time: "10:00 AM" },
      { id: 2, name: "Project Deadline", date: "2023-05-18", time: "5:00 PM" },
      {
        id: 3,
        name: "Client Presentation",
        date: "2023-05-20",
        time: "2:00 PM",
      },
    ],
  },
  {
    id: 2,
    date: "2023-05-10",
    image: "/placeholder.svg",
    eventCount: 2,
    events: [
      { id: 4, name: "Team Lunch", date: "2023-05-22", time: "12:30 PM" },
      { id: 5, name: "Product Launch", date: "2023-05-25", time: "9:00 AM" },
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Upload History</h1>
      <div className="space-y-6">
        {mockHistoryData.map((item) => (
          <Card key={item.id}>
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" />
                Upload on {item.date}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <Image
                    src={item.image}
                    alt={`Upload from ${item.date}`}
                    width={300}
                    height={300}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                  <div className="mt-4 text-center">
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Combined ICS
                    </Button>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-lg font-semibold mb-4">
                    Events Extracted: {item.eventCount}
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            {event.name}
                          </TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.time}</TableCell>
                          <TableCell>
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
