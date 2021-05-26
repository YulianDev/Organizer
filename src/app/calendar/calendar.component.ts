import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {DateService} from "../services/date.service";
import {Week} from "../models/models";



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generateCalendar.bind(this));
  }

  calendar: Week[] = [];

  private generateCalendar(today: moment.Moment) {
    const startDay = today.clone().startOf('month').startOf('week')
    const endDay = today.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, 'day')

    const calendar = []

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date')
            const disabled = !today.isSame(value, 'month')
            const selected = today.isSame(value, 'date')

            return {
              value, active, disabled, selected
            }
          })
      })
    }

    this.calendar = calendar
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }

}
