import { Component, Input, OnInit } from '@angular/core';
import { ToDo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: ToDo;

  constructor() { }

  ngOnInit(): void {
  }
}
