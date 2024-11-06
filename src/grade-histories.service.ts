import { Injectable } from '@angular/core';
import { GradeHistory } from './grade-history';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GradeHistoriesService {

  constructor(private http: HttpClient) {
   
   }

   private gradeHistoryUri = `http://localhost:3001/api/v1/gradeHistories`;
   public getGradeHistories(): Observable<GradeHistory[]> {
    console.log('get grade Histories called');

    return this.http.get<GradeHistory[]>(this.gradeHistoryUri);
  }

}
