export interface IFetch {
  status: boolean;
  message: string;
}
export interface IPaginate {
  current_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
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
  category?: {
    id: number;
    name: string;
    icon: string;
    created_at: string;
    updated_at: string;
  };
  image: string;
  book?: boolean;
  booked?: string[];
  renter_info?: {
    id: string;
    renter_name: string;
    phone: string;
    booking_time_from: string;
    booking_time_to: string;
  };
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

export interface IMVehicles extends IFetch {
  data: {
    data: IVehicle[];
  } & IPaginate;
}

export interface IUser {
  id: number;
  name: string;
  role: string;
  passcode: string;
  created_at: string;
  updated_at: string;
}

export interface IUsers extends IFetch {
  data: {
    data: IUser[];
  } & IPaginate;
}
