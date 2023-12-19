interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface IPagination<T> {
  data: T[];
  total: number;
}
