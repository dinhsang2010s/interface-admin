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

interface QueryArticleDto extends QueryDto {
  categoryId: string;
}

interface CategoryDto {
  name: string;
}

interface PostDto {
  title: string;
  description: string;
  content: string;
  categoryId: string;
  imageTopic: string;
  keyWordSeo: string;
  descriptionSeo: string;
}
