export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export type Template = {
  id: string;
  name: string;
  content: string;
  createdAt?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  dob: string;
};

export type EmailTask = {
  id: string;
  name: string;
  templateId?: string;
  scheduledTime?: string;
  status?: "pending" | "completed" | "failed";
  createdAt?: string;
  lastUpdatedAt?: string;
};
