import { Component, input, InputSignal } from '@angular/core';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog-list-item',
  imports: [],
  templateUrl: './blog-list-item.component.html',
  styleUrl: './blog-list-item.component.css'
})
export class BlogListItemComponent {
  blog: InputSignal<Blog> = input.required<Blog>();
}
