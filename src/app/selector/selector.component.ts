import { Component } from '@angular/core';
import {DateService} from "../services/date.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(private dateService: DateService) { }

  date = this.dateService.date;

  change(dir: number) {
    this.dateService.changeMonth(dir);
  }
}

