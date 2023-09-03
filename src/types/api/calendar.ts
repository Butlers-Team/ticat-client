/** 2023/07/09 - 축제 상세 데이터 Type - by parksubeom */
export interface CalendarListListType {
  data: [
    {
      memberId: number;
      festivalList: [
        {
          festivalId: number;
          calendarId: number;
          category: null;
          status: null;
          scheduledDate: string;
          calendarDate: string;
          eventStartDate: string;
          eventEndDate: string;
          title: string;
          address: string;
        },
      ];
    },
  ];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

// 축제 리스트 카테고리별
/** 2023/07/04 - 축제 리스트 카테고리별 params (Reqeust) - by  parksubeom */
export interface CalendarListRequest {
  page?: number;
  year: number;
  month: number;
  day: number;
}
/** 2023/07/04 - 축제 리스트 카테고리별 (Response) - by parksubeom */
export interface CalendarListResponse {
  json(): any;
  data?: CalendarListListType[];
}
