import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {

  @Input() cardFormGroup: FormGroup;
  selectors = ['To Improve', 'Went Well', 'Actions'];

  constructor() { }

  ngOnInit() {
  }

  setSelected(value: string): void {
    this.cardFormGroup.controls.type.setValue(value);
  }
}
