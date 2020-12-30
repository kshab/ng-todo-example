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

  private _subscriptions$: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private todoService: TodoService,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.buildForm();
    this.subscribeToMode();
  }

  public onSubmit(): void {
    if (this.todoForm.valid) {
      const todo = this.todoForm.value;
      this.addTodo(todo);
    }
  }

  private buildForm(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isImportant: [false, Validators.required]
    });
  }

  private subscribeToMode(): void {
    this._subscriptions$.add(
      this.todoService.isEditmode$
        .subscribe(isEditMode => this.isEditMode = isEditMode)
    );
  }

  private addTodo(todo: ToDo): void {
    this.storeService.addTodo(todo);
  }

  ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }
}
