export interface IFetch {
  status: boolean;
  message: string;
}

export interface IStatistic {
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

export interface IStatistics extends IFetch {
  data: IStatistic;
}

export interface IVehicle {
  id: number;
  title: string;
  code: string;
  category: string;
  image: string;
  book: boolean;
  booked: string[];
}

export interface IVehicles extends IFetch {
  data: IVehicle[];
}

export interface ICategory {
  id: number;
  name: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface ICategories extends IFetch {
  data: ICategory[];
}
