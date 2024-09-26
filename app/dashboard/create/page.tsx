"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, Image, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Create() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    // TODO: Implement file upload and AI processing logic
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating upload
    setUploading(false);
    setFile(null);
    // TODO: Navigate to edit page or show extracted events
  };

  return (
    <div className="p-6 space-y-6 min-h-screen w-full">
      <h1 className="text-3xl font-bold">Create Calendar Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpload();
              }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center w-full">
                <Label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Label>
              </div>
              {file && (
                <p className="text-sm text-gray-500">
                  Selected file: {file.name}
                </p>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={!file || uploading}
              >
                {uploading ? "Processing..." : "Extract Events"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
              <p>Upload an image of your schedule or event details</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <UploadCloud className="w-6 h-6 text-blue-600" />
              </div>
              <p>Our AI processes the image and extracts event information</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <AlertCircle className="w-6 h-6 text-green-600" />
              </div>
              <p>
                Review and edit the extracted events before adding to your
                calendar
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          For best results, ensure your image is clear and well-lit. Text should
          be easily readable.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Supported Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Our AI can extract information from various formats, including:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Handwritten notes</li>
            <li>Printed schedules</li>
            <li>Digital calendar screenshots</li>
            <li>Event flyers and posters</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
