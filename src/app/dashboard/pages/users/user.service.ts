import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  //salvo el GetALll de arriba, estos metodos no se usan. Usarlo en el componente de uuario y cambiar el codigo ya que hacen todo lo mismo
   addUser(user: User, users: User[]): void {
    let temporalUser =      {
      id: users.length + 1,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password
    };

     users = [
       ...users,
       temporalUser
     ];
   }

   deleteUser(user: User, users: User[]): void {
    users.filter((u) => u.id !== user.id);
   }

   updateUser(user: User, users: User[]): void {
    users = users.map((u) => {
      if (u.id === user.id) 
      {
        return u = user;  
      }else{
        return u;
      }
   });
  }

}