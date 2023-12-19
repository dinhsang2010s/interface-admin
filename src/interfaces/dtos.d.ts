interface LoginDto {
  name: string;
  password: string;
  remember: boolean;
}

interface QueryDto {
  offset: number;
  pageSize: number;
  orderBy: string;
  q: string;
}
