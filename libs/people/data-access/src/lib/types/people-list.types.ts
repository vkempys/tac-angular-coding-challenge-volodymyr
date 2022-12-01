export type PeopleListResponse = Person[];

export type Person = PeopleData<Date>;
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface PersonAPIFormat extends PeopleData<string> {
  balance: string;
  picture: string;
  eyeColor: string;
  company: string;
  email: string;
  phone: string;
  latitude: number;
  longitude: number;
  tags: string[];
}

export interface PeopleData<T> {
  id: string;
  age: number;
  about: string;
  gender: Gender;
  name: string;
  isActive: boolean;
  registered: T;
}
