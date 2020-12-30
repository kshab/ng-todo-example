export interface IToDo {
  name: string;
  description: string;
  isCompleted?: boolean;
  isImportant?: boolean;
  expirationDate?: Date;
  id: string;
}

export class ToDo implements IToDo {
  constructor(public name: string,
              public description: string,
              public isCompleted: boolean,
              public isImportant: boolean,
              public expirationDate: Date,
              public id: string) {
  }
}
