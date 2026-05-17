export type ContractType = "CDI" | "CDD" | "Extra" | "Apprenti";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  contract_type: ContractType | null;
  weekly_hours: number;
  weekly_rest_days: number;
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
  created_at: string;
}
