import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/tasks.service';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent implements OnInit {

  createTaskForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private readonly router: Router,
    private readonly tasksService: TasksService,
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  createTask(): void {
    const name = this.createTaskForm.get('name')?.value;

    this.tasksService.createTask(name).subscribe(
      (data) => {
        this.router.navigate(['']);
      }
    );
  }
}
