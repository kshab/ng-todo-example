import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './todos.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TodosComponent, TodoComponent, TodoEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [TodosComponent, TodoComponent]
})
export class TodosModule { }
