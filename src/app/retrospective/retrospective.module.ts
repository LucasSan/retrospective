import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetrospectiveListComponent } from './retrospective-list/retrospective-list.component';
import { RetrospectiveComponent } from './retrospective.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RetrospectiveRoutingModule } from './retrospective.routing';

@NgModule({
  declarations: [RetrospectiveListComponent, RetrospectiveComponent],
  imports: [
    RouterModule,
    HttpClientModule,
    RetrospectiveRoutingModule,
    CommonModule
  ]
})
export class RetrospectiveModule { }
