interface BaseModel {
  id: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface IPagination<T> {
  data: T[];
  total: number;
}
