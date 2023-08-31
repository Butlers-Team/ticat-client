export interface CalendarAddRequest {
  festivalId: number;
  memberId: number | null;
  scheduleDate: Date | string;
}
