export interface Alarm {
  id: string;
  time: string; // HH:mm format (24-hour)
  label?: string;
  enabled: boolean;
  notificationId?: string;
  createdAt: string;
}

export interface AlarmTime {
  hours: number;
  minutes: number;
}