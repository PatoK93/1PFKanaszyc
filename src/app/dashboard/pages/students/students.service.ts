import { Injectable } from '@angular/core';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private users: Student[] = [
    {
      id: 1,
      name: 'Marcos',
      surname: 'Rodriguez',
      age: 30,
      email: 'mark@mail.com',
      password: '123456',
    },
    {
      id: 2,
      name: 'Julian',
      surname: 'Perez',
      age: 30,
      email: 'jperez@mail.com',
      password: '123456',
    },
  ];

  constructor() {}

  getStudents(): Student[] {
    return this.users;
  }

  //No puedo pasar los metodos del CRUD aqui, ya que no me renderiza la tabla nuevamente. Creo que es algo del lifeCycle de Angular

}
