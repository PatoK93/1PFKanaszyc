import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/features/dashboard/pages/students/models/student.model';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(student: Student, ...args: unknown[]): unknown {
    const isUppercase = args[0] === 'uppercase';
    const fullName = `${student.name} ${student.surname}`;
    return isUppercase ? fullName.toUpperCase() : fullName;
  }
}
