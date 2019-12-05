import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Sprints } from '../shared/model/sprints.model';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

  @Input() filterFormGroup: FormGroup;
  @Input() model: Array<Sprints>;

  constructor() { }

  ngOnInit() {
  }

}
