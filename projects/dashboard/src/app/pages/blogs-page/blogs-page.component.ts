import { Component, inject, OnInit } from '@angular/core';
import { BlogListComponent } from "./components/blog-list/blog-list.component";
import { BlogFormComponent } from "./components/blog-form/blog-form.component";
import { Blog } from './models/blog';
import { BlogsService } from './services/blogs.service';

@Component({
  selector: 'app-blogs-page',
  imports: [BlogListComponent, BlogFormComponent],
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.css'
})
export class BlogsPageComponent {
  _BlogsService = inject(BlogsService)

}
