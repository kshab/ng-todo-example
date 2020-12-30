import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _isEditmode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isEditmode$(): Observable<boolean> {
    return this._isEditmode$.asObservable();
  }

  constructor() { }

  public setMode(isEditmode: boolean): void {
    this._isEditmode$.next(isEditmode);
  }
}
