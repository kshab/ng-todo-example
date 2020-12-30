import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './todos.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';



@NgModule({
  declarations: [TodosComponent, TodoComponent, TodoEditComponent],
  imports: [
    CommonModule
  ],
  exports: [TodosComponent, TodoComponent]
})
export class TodosModule { }
