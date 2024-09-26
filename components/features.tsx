"use client";

import { Camera, Calendar, Clock, Edit, Download, Share2 } from "lucide-react";

const features = [
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: "AI-Powered Image Recognition",
    description:
      "Upload images of event details, and our advanced AI extracts the information automatically.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Instant Calendar Creation",
    description:
      "Convert extracted information into calendar events with just a click.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Time-Saving Efficiency",
    description:
      "Reduce manual data entry and save hours of your valuable time.",
  },
  {
    icon: <Edit className="h-10 w-10 text-primary" />,
    title: "Easy Editing",
    description:
      "Review and modify extracted event details before finalizing your calendar entry.",
  },
  {
    icon: <Download className="h-10 w-10 text-primary" />,
    title: "Multiple Format Support",
    description:
      "Download your events in various formats compatible with popular calendar applications.",
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: "Seamless Sharing",
    description:
      "Share created events with colleagues, friends, or family members effortlessly.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
