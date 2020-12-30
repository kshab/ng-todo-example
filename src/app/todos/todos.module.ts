import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './todos.component';



@NgModule({
  declarations: [TodosComponent, TodoComponent],
  imports: [
    CommonModule
  ],
  exports: [TodosComponent, TodoComponent]
})
export class TodosModule { }
