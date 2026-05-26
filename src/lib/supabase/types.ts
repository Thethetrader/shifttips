export type ContractType = "CDI" | "CDD" | "Extra" | "Apprenti";

// Keys are ISO weekday strings "1"=Lun … "7"=Dim
export type ScheduleTemplate = {
  [day: string]: { start: string; end: string };
};

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  contract_type: ContractType | null;
  weekly_hours: number;
  weekly_rest_days: number;
  schedule_template: ScheduleTemplate | null;
  created_at: string;
}

export interface Workplace {
  id: string;
  user_id: string;
  name: string;
  schedule_template: ScheduleTemplate;
  created_at: string;
}

export interface Shift {
  id: string;
  user_id: string;
  shift_date: string;
  start_time: string | null;
  end_time: string | null;
  hours_worked: number;
  tips: number;
  note: string | null;
  workplace_id: string | null;
  created_at: string;
}
