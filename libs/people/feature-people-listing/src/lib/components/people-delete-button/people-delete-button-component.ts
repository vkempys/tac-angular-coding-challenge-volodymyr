import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalConfirmComponent } from '@tac/shared/ui-core';

@Component({
  selector: 'tac-nx-ppl-delete-button',
  templateUrl: './people-delete-button-component.html',
  styleUrls: ['./people-delete-button-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleDeleteButtonComponent {

  @Input() name: string;
  @Output() delete: EventEmitter<void> = new EventEmitter();

  constructor(private readonly modalService: NgbModal) {}
  
  onPersonDelete() {
    const modalRef = this.modalService.open(NgbdModalConfirmComponent);
    modalRef.componentInstance.title = 'Person deletion'
    modalRef.componentInstance.content = `You are going to delete ${this.name}. This operation can't be undone`;
    modalRef.closed.subscribe(() => this.delete.emit());
  }
}