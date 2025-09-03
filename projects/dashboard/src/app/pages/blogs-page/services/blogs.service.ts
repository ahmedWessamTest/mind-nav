import { Injectable, signal, WritableSignal } from '@angular/core';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  blogs: WritableSignal<Blog[]> = signal([

  ]
  );
  blogToEdit = signal<Blog | null>(null);
  deleteBlog(id: number | null): void {
    console.log(id);
    this.blogs.update(prev => prev.filter(blog => blog.id !== id))
  }
  updateBlog(newBlog: Blog) {
    this.blogs.update(prev => prev.map(blog => blog.id === newBlog.id ? newBlog : blog));
  }
}
