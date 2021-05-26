import * as moment from "moment";

export interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

export interface Week {
  days: Day[];
}

export interface Task {
  title: string,
  id?: string,
  date?: string,
}

export interface CreateResponse {
  name: string
}
