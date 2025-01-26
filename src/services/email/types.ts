export interface EmailMessage {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  html: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}