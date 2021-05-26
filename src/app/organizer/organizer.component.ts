import {Component, OnInit} from '@angular/core';
import {DateService} from "../services/date.service";
import {TasksService} from "../services/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../models/models";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  tasks: Task[] = [];

  constructor(private dateService: DateService, private tasksService: TasksService) {
  }

  dateServ = this.dateService;

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl("", Validators.required)
    });

    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))).subscribe(tasks => {this.tasks = tasks})
  }

  submit() {
    const title = this.form.value.text;
    const task: Task = {
      title,
      date: this.dateService.date.value.format("DD-MM-YYYY"),
    }

    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
    }, error => console.error(error));
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(currentTusk => currentTusk.id !== task.id);
    }, error => console.error(error));
  }
}
