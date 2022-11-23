import { Component } from '@angular/core';
import { Project } from './models/project';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timely2.UI2';
  projects: Project[] = [];
  projectToEdit?: Project;
  showShowComponent=false;
  isButtonVisible=true;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    /*this.projectService.getProjects()
    .subscribe((result: Project[]) => (this.projects=result));*/
  }

  updateProjectList(projects: Project[]) {
    this.projects=projects;
  }

  initNewProject(){
    this.projectToEdit=new Project();
  }

  editProject(project:Project){
    this.projectToEdit=project;
  }
  
  showProjects(){
    this.projectService.getProjects();
  }

  startButtonClicked(){
    this.isButtonVisible=false
    if(this.showShowComponent==true){
      this.showShowComponent=false;
    }
    else{
      this.showShowComponent=true;
    }
  }
}
