import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  //Pasar esto al mock, o, eliminar el mock si no tiene utilidad
  private users: User[] = [
    {
      id: 1,
      name: 'Marcos',
      surname: 'Rodriguez',
      email: 'mark@mail.com',
      password: '123456',
    },
    {
      id: 2,
      name: 'Julian',
      surname: 'Perez',
      email: 'jperez@mail.com',
      password: '123456',
    },
  ];

  constructor() { }

  //esto esta dos veces, ver de usar aca o en el mock, pero no en los dos lugares
  getUsers(): User[] {
    return this.users;
  }

  //salvo el GetALll de arriba, estos metodos no se usan. Usarlo en el componente de uuario y cambiar el codigo ya que hacen todo lo mismo
   createuser(user: User): void {
     this.users = [
       ...this.users,
       user,
     ]
   }

   deleteuserbyid(user: User): void {
     this.users = [
       ...this.users,
       user,
     ]
   }

   updateuserbyid(user: User): void {
     this.users = [
       ...this.users,
       user,
     ]
   }

}
