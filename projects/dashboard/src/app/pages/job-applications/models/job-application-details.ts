import { Question } from "./question";

export interface JobApplicationDetails {
  uid: string;
  name: string;
  title: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  resumeName: string;
  portfolio: string;
  linkedin: string;
  yearsOfExperience: number;
  preferredRole: string;
  availability: string;
  salaryExpectations: string;
  questions: Question[];
}
