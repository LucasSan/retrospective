import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Cards } from '../shared/model/retrospective.model';

@Component({
  selector: 'app-retrospective-list',
  templateUrl: './retrospective-list.component.html',
  styleUrls: ['./retrospective-list.component.scss']
})
export class RetrospectiveListComponent implements OnInit, OnChanges {

  @Input() model: Cards;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('teste 2: ', this.model);
  }
}
