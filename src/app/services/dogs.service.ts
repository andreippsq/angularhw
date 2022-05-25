import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendURL } from '../contants';
import { IDog } from '../model/idog';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(private http: HttpClient) { }

  getDogs() {
    return this.http.get<IDog[]>(backendURL.dogs);
  }

  addDog(dog: IDog) {
    return this.http.post<IDog>(backendURL.dogs, dog);
  }

  updateDog(dog: IDog) {
    return this.http.put<IDog>(backendURL.dogs + '/' + dog.id, dog);
  }

  deleteDog(id: number) {
    return this.http.delete<IDog>(backendURL.dogs + '/' + id);
  }

  getDog(id: string) {
    return this.http.get<IDog>(backendURL.dogs + '/' + id);
  }
}
