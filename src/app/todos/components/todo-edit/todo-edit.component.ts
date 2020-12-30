import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoService } from '../../../shared/services/todo.service';
import { ToDo } from '../../models/todo.model';
import { StoreService } from '../../../shared/services/store.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  public todoForm: FormGroup;
  public isEditMode: boolean = false;

  private _currentTodo: ToDo;
  private _subscriptions$: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private todoService: TodoService,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.buildForm();
    this.subscribeToEditMode();
    this.subscribeToCurrentTodo();
  }

  public onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const todo = this.todoForm.value;

    if (this.isEditMode) {
      this.updateTodo(this._currentTodo?.id, todo);
    } else {
      this.addTodo(todo);
    }
  }

  private buildForm(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isImportant: [false, Validators.required],
      expirationDate: ['']
    });
  }

  private subscribeToEditMode(): void {
    this._subscriptions$.add(
      this.todoService.isEditmode$
        .subscribe(isEditMode => this.isEditMode = isEditMode)
    );
  }

  private subscribeToCurrentTodo(): void {
    this._subscriptions$.add(
      this.todoService.currentItem$
        .subscribe(currentTodo => {
          this._currentTodo = currentTodo;
          this.fillForm(currentTodo);
        })
    );
  }

  private addTodo(todo: ToDo): void {
    this.storeService.addTodo(todo);
  }

  private updateTodo(todoId: string, todo: ToDo): void {
    this.storeService.updateTodo(todoId, todo);
  }

  private fillForm(todoItem: ToDo): void {
    if (todoItem) {
      this.todoForm.patchValue({
        name: todoItem.name,
        description: todoItem.description,
        isImportant: todoItem.isImportant
      });
    }
  }

  ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }
}
