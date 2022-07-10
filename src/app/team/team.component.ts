import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { NewTeam } from '../newTeam';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public teams: Team[] = [];
  public editTeam?: Team;
  public deleteTeam?: Team;

  public employees: Employee[] = [];
  public employeeIds: number[] = [];


  constructor(private teamService: TeamService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getTeams();
    this.getEmployees();
    
  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getTeams(): void {
    this.teamService.getTeams().subscribe(
      (response: Team[]) => {
        this.teams = response;
        console.log(this.teams);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(team: Team, mode: string): void {
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTeamModal');
    }
    if (mode === 'edit') {
      this.editTeam = team;
      button.setAttribute('data-target', '#updateTeamModal');
    }
    if (mode === 'delete') {
      this.deleteTeam = team;
      button.setAttribute('data-target', '#deleteTeamModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddTeam(addForm: NgForm): void {
    document.getElementById('add-team-form')?.click();
    this.teamService.addTeam(addForm.value, this.employeeIds).subscribe(
      (response: NewTeam) => {
        this.getTeams();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTeam(team: NewTeam): void {
    this.teamService.updateTeam(team, this.employeeIds).subscribe(
      (response: NewTeam) => {
        this.getTeams();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProject(teamId: number): void {
    this.teamService.deleteTeam(teamId).subscribe(
      (response: void) => {
        this.getTeams();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
