"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does QwikCal work?",
    answer:
      "QwikCal uses advanced AI to analyze images of event details, such as flyers or screenshots. It then extracts relevant information and converts it into a calendar file (.ics) that you can easily import into your preferred calendar application.",
  },
  {
    question: "What types of images can I upload?",
    answer:
      "You can upload various types of images, including photos of event posters, screenshots of event details, or any image containing text with event information. Supported formats include JPEG, PNG, and GIF.",
  },
  {
    question: "How accurate is the AI extraction?",
    answer:
      "Our AI model is highly accurate and continuously improving. However, we always recommend reviewing the extracted information before finalizing your calendar event to ensure all details are correct.",
  },
  {
    question: "Can I edit the extracted information?",
    answer:
      "Yes, after the AI extracts the information, you can review and edit all fields before generating the final calendar file. This allows you to correct any mistakes or add additional details.",
  },
  {
    question: "Is QwikCal compatible with all calendar applications?",
    answer:
      "QwikCal generates standard .ics (iCalendar) files, which are compatible with most popular calendar applications, including Google Calendar, Apple Calendar, Microsoft Outlook, and many others.",
  },
  {
    question: "How secure is my data when using QwikCal?",
    answer:
      "We take data security seriously. All uploaded images and extracted information are processed securely and are not stored on our servers after the calendar file is generated. We adhere to strict privacy policies to protect your information.",
  },
  {
    question: "Can I use QwikCal for multiple events at once?",
    answer:
      "Currently, QwikCal processes one event image at a time. However, you can quickly process multiple events by uploading images sequentially.",
  },
  {
    question: "What if the AI misses some information from the image?",
    answer:
      "While our AI is designed to capture most event details, it may occasionally miss some information. That's why we provide an editing interface where you can add or modify any details before creating the final calendar event.",
  },
  {
    question: "Is there a limit to how many images I can process?",
    answer:
      "Free users can process a limited number of images per month. For unlimited use, consider upgrading to our premium plan, which offers additional features and no processing limits.",
  },
];

export function Faq() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
