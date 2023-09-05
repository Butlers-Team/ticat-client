export interface CalendardataType {
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
