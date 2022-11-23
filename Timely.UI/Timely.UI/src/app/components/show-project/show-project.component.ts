import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit {
  @Input() project?: Project;
  @Output() projectsUpdated = new EventEmitter<Project[]>();
  projects: Project[] = [];
  projectToEdit?: Project;
  isDivVisible=true;
  areProjectsVisible=false;
  isModalVisible=true;
  startDate=new Date();
  //startHours=this.startDate.getHours();
  startMinutes=this.startDate.getMinutes();
  projectName:string="";
  

  

  constructor(private projectService: ProjectService ) { }

  ngOnInit(): void {
  }

  showProjects(){
    this.projectService.getProjects()
    .subscribe((projects)=>this.projectsUpdated.emit(this.projects=projects));
  }

  editProject(project:Project){
    this.projectToEdit=project;
  }

  updateProjectList(projects: Project[]) {
    this.projects=projects;
  }

  createProject(project:Project){
    this.projectService
      .createProject(project)
      .subscribe((projects) => this.projectsUpdated.emit(this.projects=projects));
  }

  stopClicked(){
    if(this.isModalVisible==true){
      this.isModalVisible=false;
    }
    else{
      this.isModalVisible=true;
    }
    this.isDivVisible=false;
  }

  getValue(val:string){
     this.projectName=val;
  }

  stopTimerClicked(){
    
    var endDate=new Date();
    //var endHours=endDate.getHours();
    var endMinutes=endDate.getMinutes();
    //var hoursDifference=this.startHours-endHours;
    var minutesDifference=endMinutes-this.startMinutes;
    if(minutesDifference<0){
      minutesDifference=60+minutesDifference;
    }
    if(minutesDifference>60){
      minutesDifference=60+minutesDifference;
    }
    
    var startDateString=this.startDate.toString().slice(4,21);
    var endDateString=endDate.toString().slice(4,21);

    var newProject= new Project();
    newProject.name=this.projectName;
    newProject.start=startDateString;
    newProject.stop=endDateString;
    newProject.duration=minutesDifference;

    this.createProject(newProject);
    this.showProjects();
    

    this.isModalVisible=true;
    if(this.areProjectsVisible==true){
      this.areProjectsVisible=false;
    }
    else{
      this.areProjectsVisible=true;
    }

  }

  startClicked(){
    this.isModalVisible=true;;
    this.areProjectsVisible=false;
    this.isDivVisible=true;
    this.startDate=new Date();
    this.startMinutes=this.startDate.getMinutes();
  }
}

