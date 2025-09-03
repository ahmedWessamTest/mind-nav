import { Component, signal, output } from '@angular/core';

@Component({
  selector: 'app-blog-delete-modal',
  imports: [],
  templateUrl: './blog-delete-modal.component.html',
  styleUrl: './blog-delete-modal.component.css'
})
export class BlogDeleteModalComponent {
  isOpen = signal<boolean>(false);
  confirm = output<void>();
  toggleModal(): void {
    this.isOpen.update(prev => !prev);
  }
  onConfirm() {
    console.log('inside');
    this.confirm.emit();
    this.toggleModal();
  }
}
