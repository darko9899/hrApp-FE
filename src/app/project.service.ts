import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiServerUrl}/project/all`);
  }

  public addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiServerUrl}/project/add`, project);
  }

  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiServerUrl}/project/update`, project);
  }

  public deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/project/delete/${projectId}`);
  }
}
