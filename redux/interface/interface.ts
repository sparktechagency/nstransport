interface IStatistic {
  total_vehicle: number;
  available: number;
  booked: number;
  available_info: [
    {
      category: string;
      count: number;
      image: string;
    }
  ];
}
