// src/components/cloudinary/cloudinary.d.ts

interface CloudinaryUploadWidgetOptions {
  cloudName: string;
  uploadPreset: string;
}

interface CloudinaryUploadWidget {
  open(): void;
  close(): void;
}

interface Cloudinary {
  createUploadWidget(
    options: CloudinaryUploadWidgetOptions,
    callback: (error: any, result: any) => void
  ): CloudinaryUploadWidget;
}

declare global {
  interface Window {
    cloudinary: Cloudinary;
  }
}

export {};
