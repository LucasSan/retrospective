import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [{
  path: '',
  redirectTo: '/administracao-usuarios',
  pathMatch: 'full'
},
{
  path: 'administracao-usuarios',
  loadChildren: 'src/app/retrospective/retrospective.module#RetrospectiveModule'
},
{
  path: '**',
  redirectTo: '/home'
}];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
