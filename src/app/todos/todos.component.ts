import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from './models/todo.model';
import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public toDoList$: Observable<ToDo[] | []>;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.toDoList$ = this.storeService.todos$;
  }
}
