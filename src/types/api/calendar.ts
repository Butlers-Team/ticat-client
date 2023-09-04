/** 2023/07/09 - 축제 상세 데이터 Type - by parksubeom */
export interface CalendarListListType {
  data: [
    {
      memberId: number;
      festivalList: [
        {
          address: string;
          category: string;
          eventEndDate: string;
          eventhomepage: string;
          eventplace: string;
          eventStartDate: string;
          festivalId: number;
          image: string;
          liked: boolean;
          mapx: number;
          mapy: number;
          overview: string;
          playtime: string;
          price: string;
          status: string;
          tel: string;
          title: string;
          calendarId: number;
          scheduledDate: string;
          calendarDate: string;
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

export interface CalendarListType {
  address: string;
  category: string;
  eventEndDate: string;
  eventhomepage: string;
  eventplace: string;
  eventStartDate: string;
  festivalId: number;
  image: string;
  liked: boolean;
  mapx: number;
  mapy: number;
  overview: string;
  playtime: string;
  price: string;
  status: string;
  tel: string;
  title: string;
  calendarId: number;
  scheduledDate: string;
  calendarDate: string;
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
