export type ImageFileType = "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml";
export type VideoFileType = "video/mp4" | "video/mpeg" | "video/quicktime" | "video/x-msvideo";
export type DocumentFileType =
    | "application/pdf"
    | "application/msword"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    | "application/vnd.ms-excel"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export type AudioFileType = "audio/mpeg" | "audio/wav" | "audio/ogg" | "audio/aac";

export type FileUploadSuccessType = { status: "success"; url: string };
export type FileUploadFailureType = { status: "failure"; message: string };
