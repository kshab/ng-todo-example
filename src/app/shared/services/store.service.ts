import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ToDo } from '../../todos/models/todo.model';

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
      .subscribe((todos: ToDo[]) => {
        this._todos$.next(todos);
      });
  }
}
