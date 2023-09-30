export type IndexData<T> = {
  page_count: number;
  rows: Partial<T>[];
};
