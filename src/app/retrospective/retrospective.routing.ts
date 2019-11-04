import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetrospectiveComponent } from './retrospective.component';

const ROUTES: Routes = [{
    path: '',
    component: RetrospectiveComponent,
}];

@NgModule({
imports: [RouterModule.forChild(ROUTES)],
exports: [RouterModule]
})
export class RetrospectiveRoutingModule { }
