"use client";

import { Button } from "@/components/ui/button";
import Navbar from "./navbar";

export default function Hero() {
  return (
    <header
      id="home"
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
    >
      <Navbar />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Turn Images into Calendar Events Instantly
        </h1>
        <p className="text-xl mb-8">
          QwikCal uses AI to extract event details from images and create
          calendar files in seconds.
        </p>
        <Button
          size="lg"
          className="bg-white text-purple-500 hover:bg-gray-100"
        >
          Get Started for Free
        </Button>
      </div>
    </header>
  );
}
