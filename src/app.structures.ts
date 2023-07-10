export interface IPaginatedList<T> {
  totalItems: number;
  page: number;
  itemsPerPage: number;
  items: T[];
}
