import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
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
    this.setFakeData();
  }

  public setFakeData(): void {
    const fakeTodo1 = new ToDo(
      'test 1',
      'it is a test todo',
      false,
      false,
      new Date(),
      '1'
    );

    const fakeTodo2 = new ToDo(
      'test 2',
      'it is a second test todo',
      false,
      false,
      new Date(),
      '2'
    );

    this.addTodo(fakeTodo1);
    this.addTodo(fakeTodo2);
  }

  public addTodo(todoItem: ToDo): void {
    this._todos$.next([...this._todos$.value, todoItem]);
  }
}
