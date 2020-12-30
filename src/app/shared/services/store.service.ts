import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ToDo } from '../../todos/models/todo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _todos$: BehaviorSubject<ToDo[] | []> = new BehaviorSubject<ToDo[] | []>([]);

  get todos$(): Observable<ToDo[] | []> {
    return this._todos$.asObservable();
  }

  constructor(private fireStore: AngularFirestore) {
    this.subscribeToTodos();
  }

  public addTodo(todoItem: ToDo): void {
    this.fireStore.collection('todo').add(todoItem);
  }

  public updateTodo(todoId: string, todoItem: ToDo): void {
    this.fireStore.collection('todo').doc(todoId).update(todoItem);
  }

  public deleteTodo(todoItem: ToDo): void {
    this.fireStore.collection('todo').doc(todoItem.id).delete();
  }

  private subscribeToTodos(): void {
    this.fireStore.collection('todo')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(todos => todos.sort(this.sortTodos))
      )
      .subscribe((todos: ToDo[]) => {
        this._todos$.next(todos);
      });
  }

  private sortTodos(a, b): number {
    if (a.isCompleted && !b.isCompleted) {
      return -1;
    } else if (b.isCompleted && !a.isCompleted) {
      return 1;
    } else if (a.isImportant && !b.isImportant) {
      return -1;
    } else if (b.isImportant && !a.isImportant) {
      return 1;
    } else {
      return 0;
    }
  }
}
