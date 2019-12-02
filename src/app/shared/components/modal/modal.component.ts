import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Cards } from 'src/app/retrospective/shared/model/retrospective.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() isValid: boolean;
  @Input() close: boolean;
  @Input() submitButtonText: string;
  @Input() modalId: string;
  @Output() submit: EventEmitter<Cards> = new EventEmitter();
  @ViewChild('closeModal') closeModalButton: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.close && changes.close.currentValue) {
      this.closeModal();
    }
  }

  onSubmit(): void {
    this.submit.emit();
  }

  closeModal(): void {
    this.closeModalButton.nativeElement.click();
  }

}
