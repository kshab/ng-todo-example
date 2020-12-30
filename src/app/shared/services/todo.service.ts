import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDo } from '../../todos/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _isEditmode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _currentTodo$: BehaviorSubject<ToDo | null> = new BehaviorSubject<ToDo | null>(null);

  get isEditmode$(): Observable<boolean> {
    return this._isEditmode$.asObservable();
  }

  get currentItem$(): Observable<ToDo> {
    return this._currentTodo$.asObservable();
  }

  constructor() { }

  public setEditMode(isEditmode: boolean): void {
    this._isEditmode$.next(isEditmode);
  }

  public setCurrentToDo(todoitem: ToDo): void {
    this._currentTodo$.next(todoitem);
  }
}
