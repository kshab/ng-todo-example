import { Component, Input, OnInit } from '@angular/core';
import { ToDo } from '../../models/todo.model';
import { StoreService } from '../../../shared/services/store.service';
import { TodoService } from '../../../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo: ToDo;

  constructor(private storeService: StoreService,
              private todoService: TodoService) {
  }

  public onEdit(todoItem: ToDo): void {
    this.todoService.setCurrentToDo(todoItem);
    this.todoService.setEditMode(true);
  }

  public onComplete(todoItem: ToDo): void {
    todoItem.isCompleted = true;
    this.storeService.updateTodo(todoItem?.id, todoItem);
  }

  public onDelete(todoItem: ToDo): void {
    this.storeService.deleteTodo(todoItem);
  }

  public getExpirationInDays(todo: ToDo): string {
    if (todo?.expirationDate) {
      let currentDate = new Date(Date.now()).getMilliseconds();
      let expirationDate = new Date(todo.expirationDate.seconds * 1000).getMilliseconds();
      let diff = expirationDate - currentDate;

      return '';
    } else {
      return '';
    }
  }
}
