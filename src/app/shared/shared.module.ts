import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [MenuComponent, HeaderComponent, ModalComponent],
  exports: [MenuComponent, HeaderComponent, ModalComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
