"use client";

import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import Link from "next/link";

export default function Hero() {
  return (
    <header
      id="home"
      className="bg-gradient-to-r from-yellow-500 to-orange-400 text-white"
    >
      <Navbar />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-black mb-4">
          Turn Images into Calendar Events Instantly
        </h1>
        <p className="text-xl text-black mb-8">
          QwikCal uses AI to extract event details from images and create
          calendar files in seconds.
        </p>
        <Button
          size="lg"
          className="bg-black text-white font-semibold hover:bg-white hover:text-yellow-500"
        >
          <Link href={"/dashboard"}>Get Started for Free</Link>
        </Button>
      </div>
    </header>
  );
}
