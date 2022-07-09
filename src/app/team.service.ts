import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewTeam } from './newTeam';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiServerUrl}/team/all`);
  }

  public addTeam(team: NewTeam): void{
     this.http.post<Team>(`${this.apiServerUrl}/team/add`, team);
  }

  public updateTeam(team: NewTeam): void {
     this.http.put<Team>(`${this.apiServerUrl}/team/update`, team);
  }

  public deleteTeam(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/team/delete/${teamId}`);
  }
}
