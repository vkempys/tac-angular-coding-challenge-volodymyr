import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'tac-nx-shrd-uic-modal-confirm',
  standalone: true,
	templateUrl: './confirm-modal.component.html',
})
export class NgbdModalConfirmComponent {

	@Input() title: string;
	@Input() content: string; 

  constructor(public readonly modal: NgbActiveModal) { }
}