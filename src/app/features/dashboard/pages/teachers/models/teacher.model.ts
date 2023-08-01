export interface Teacher {
  id: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
}

export interface CreateTeacherData {
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
}

export interface UpdateTeacherData {
  name?: string;
  surname?: string;
  age?: number;
  email?: string;
  password?: string;
}
