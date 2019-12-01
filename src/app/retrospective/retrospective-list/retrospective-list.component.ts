import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Cards } from '../shared/model/retrospective.model';

@Component({
  selector: 'app-retrospective-list',
  templateUrl: './retrospective-list.component.html',
  styleUrls: ['./retrospective-list.component.scss']
})
export class RetrospectiveListComponent implements OnChanges {

  @Input() model: Cards;
  @Output() editItem: EventEmitter<Cards> = new EventEmitter();
  @Output() deleteItem: EventEmitter<Cards> = new EventEmitter();

  constructor() { }

  ngOnChanges() {
  }

  editCard(item: Cards): void {
    this.editItem.emit(item);
  }

  deleteCard(item: Cards): void {
    this.deleteItem.emit(item);
  }
}
