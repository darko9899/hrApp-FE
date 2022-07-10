import { Employee } from "./employee";
import { Project } from "./project";
import { TeamEmployee } from "./teamEmployee";

export interface Team {
    id: number;
    name: string;
    allTeamProjects: string;
    employees: TeamEmployee[];
  }
  