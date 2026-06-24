export interface ActivityLog {
  id: number;
  action: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
}
