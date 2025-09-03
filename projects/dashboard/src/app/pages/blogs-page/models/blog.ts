export interface Blog {
  id: number;
  title: string;
  content: string;
  category: string;
  coverImage: File
  date: Date;
  status: 'published' | 'draft';
}
