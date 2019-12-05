import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetrospectiveListComponent } from './retrospective-list/retrospective-list.component';
import { RetrospectiveComponent } from './retrospective.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RetrospectiveRoutingModule } from './retrospective.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetrospectiveService } from './shared/retrospective.service';
import { SharedModule } from '../shared/shared.module';
import { CardFormComponent } from './card-form/card-form.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { FilterFormComponent } from './filter-form/filter-form.component';

@NgModule({
  declarations: [RetrospectiveListComponent, RetrospectiveComponent, CardFormComponent, SprintFormComponent, FilterFormComponent],
  imports: [
    RouterModule,
    HttpClientModule,
    RetrospectiveRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [RetrospectiveService]
})
export class RetrospectiveModule { }
