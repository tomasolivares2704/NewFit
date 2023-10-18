import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Foods } from 'src/app/interfaces/foods';
import { EjercicioItem } from 'src/app/interfaces/exerciseitem';

interface FoodItem {
  id_food: number;
  name_food: string;
  description_food: string;
  img_food: string;
  protein_food: number;
  carbs_food: number;
  fat_food: number;
  type_food: number;
  calories_food: number | null;
}

interface Ejercicio {
  id_exercide: number;
  class_exercise: number;
  expertis_exercise: number;
  img_exercise: string;
  description_exercise: string;
  beginer_exercise: string;
  inter_exercise: string;
  expert_exercise: string;
}



@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = 'https://gcd296f2292fa10-db20220602213410.adb.sa-santiago-1.oraclecloudapps.com/ords/fitnutrition/fd/proteina';

  private apiEjercicio = 'https://gcd296f2292fa10-db20220602213410.adb.sa-santiago-1.oraclecloudapps.com/ords/fitnutrition/RUTINAS/TODAS';


  constructor(private http: HttpClient) { }

  getAllFoods(): Observable<FoodItem[]> {
    return this.http.get<{ items: FoodItem[] }>(this.apiUrl)
      .pipe(map(response => response.items));
  }

  createFood(food: FoodItem): Observable<FoodItem> {
    return this.http.post<FoodItem>(this.apiUrl, food).pipe(
      catchError(error => {
        console.error('Error al enviar la solicitud POST:', error);
        throw error; // Propaga el error para que sea manejado por el suscriptor en el componente
      })
    );
  }

  getAllEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<{ items: Ejercicio[] }>(this.apiEjercicio)
      .pipe(map(response => response.items));
  }

  createdEjercicio(ejercicio: Ejercicio): Observable<EjercicioItem> {
    return this.http.post<EjercicioItem>(this.apiEjercicio, ejercicio).pipe(
      catchError(error => {
        console.error('Error al enviar la solicitud POST:', error);
        throw error; // Propaga el error para que sea manejado por el suscriptor en el componente
      })
    );
  }


}
