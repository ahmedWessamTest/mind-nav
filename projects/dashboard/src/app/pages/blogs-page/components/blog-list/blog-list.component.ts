import { Component, computed, ContentChild, ElementRef, inject, input, InputSignal, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { BlogListItemComponent } from "../blog-list-item/blog-list-item.component";
import { Blog } from '../../models/blog';
import { SortByPipe } from '../../../../shared/pipes/sort-by.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { BlogsService } from '../../services/blogs.service';
import { BlogDeleteModalComponent } from "../blog-delete-modal/blog-delete-modal.component";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
  imports: [SortByPipe, DatePipe, SearchPipe, CommonModule, FormsModule, BlogDeleteModalComponent]
})
export class BlogListComponent {
  private readonly _BlogsService = inject(BlogsService)
  blogs: Signal<Blog[]> = computed(() => this._BlogsService.blogs());
  searchText: WritableSignal<string> = signal<string>('');
  sortField: WritableSignal<'title' | 'date'> = signal('date');
  sortOrder: WritableSignal<'asc' | 'desc'> = signal<'asc' | 'desc'>('asc');
  blogIdToDelete = signal<number | null>(null);
  @ViewChild('deleteModal') deleteModal!: BlogDeleteModalComponent;
  openDeleteModal(id: number): void {
    this.blogIdToDelete.set(id);
    this.deleteModal.toggleModal();
  }
  onSearchChange(value: string) {
    this.searchText.set(value)
  }
  onSortChange(value: string) {
    if (value === 'nameAsc') {
      this.sortField.set('title');
      this.sortOrder.set('asc');
    } else if (value === 'nameDesc') {
      this.sortField.set('title');
      this.sortOrder.set('desc');
    } else if (value === 'dateAsc') {
      this.sortField.set('date');
      this.sortOrder.set('asc');
    } else if (value === 'dateDesc') {
      this.sortField.set('date');
      this.sortOrder.set('desc');
    }
  }
  deleteBlog(): void {
    if (this.blogIdToDelete !== null) {
      this._BlogsService.deleteBlog(this.blogIdToDelete())
    }
  }
  editBlog(blog: Blog) {
    if (blog) {
      this._BlogsService.blogToEdit.set(blog);
    }
  }
}
