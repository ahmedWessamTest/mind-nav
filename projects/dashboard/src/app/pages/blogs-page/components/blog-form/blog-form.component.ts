import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal, computed, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _BlogsService = inject(BlogsService);
  blogToEdit = computed<Blog | null>(() => this._BlogsService.blogToEdit());
  coverImage: WritableSignal<File | null> = signal(null);
  imagePreview: WritableSignal<string | ArrayBuffer | null> = signal(null);
  isDragOver: WritableSignal<boolean> = signal(false);
  postForm: FormGroup = this._FormBuilder.group({
    id: [Math.floor(Math.random() * 1000)],
    title: ['', Validators.required],
    content: ['', Validators.required],
    category: ['', Validators.required],
    coverImage: [null],
    status: ['published'],
    date: [null]
  });
  constructor() {
    effect(() => {
      if (this.blogToEdit()) {
        this.postForm.patchValue({
          id: this.blogToEdit()?.id,
          title: this.blogToEdit()?.title,
          content: this.blogToEdit()?.content,
          category: this.blogToEdit()?.category,
          coverImage: this.blogToEdit()?.coverImage || null,
          status: this.blogToEdit()?.status,
          date: this.blogToEdit()?.date
        })
      }
      if (this.blogToEdit()?.coverImage) {
        this.handleFile(this.blogToEdit()?.coverImage!)
      }

    })
  }
  ngOnInit(): void {

  }
  handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    this.coverImage.set(file);
    this.postForm.patchValue({ coverImage: file });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result);
    }
    reader.readAsDataURL(file);
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    if (file) this.handleFile(file);
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(true);
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }
  saveAsDraft() {
    if (this.postForm.valid) {
      this.postForm.patchValue({ status: 'draft', date: new Date() });
      this._BlogsService.blogs.update(prev => [...prev, { ...this.postForm.value }]);
      console.log("Saving draft...", this.postForm.value);
      this.postForm.reset();
      this.imagePreview.set(null);
    } else {
      this.postForm.markAllAsTouched();
    }
  }
  addNow() {
    if (this.postForm.valid) {
      this.postForm.patchValue({ status: 'published', date: new Date() });
      this._BlogsService.blogs.update(prev => [...prev, { ...this.postForm.value }]);
      this.imagePreview.set(null);
      console.log("Adding now...", this.postForm.value);
      this.postForm.reset()
    } else {
      this.postForm.markAllAsTouched();
    }
  }
  updateBlog(): void {
    if (this.postForm.valid && this.blogToEdit()) {
      this._BlogsService.updateBlog(this.postForm.value);
      this.clearEdit();
    }
  }
  publishDraft() {
    this.postForm.patchValue({ status: 'published' });
    if (this.postForm.valid && this.blogToEdit()) {
      this._BlogsService.updateBlog(this.postForm.value);
      this.clearEdit();
    }
  }
  draftPublished(): void {
    this.postForm.patchValue({ status: 'draft' });
    if (this.postForm.valid && this.blogToEdit()) {
      this._BlogsService.updateBlog(this.postForm.value);
      this.clearEdit();
    }
  }
  cancelEdits(): void {
    this.clearEdit();
  }
  clearEdit(): void {
    setTimeout(() => {
      this.imagePreview.set(null);
      this.postForm.reset();
      this._BlogsService.blogToEdit.set(null);
    })
  }
}
