export class HttpResponse<T> {
  data: T;
  status: number;
  message: string;

  constructor(data: T, status: number, message: string) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
}

export class HttpError {
  status: number | string;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export class Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;

  constructor(page: number, limit: number, total: number, totalPages: number) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = totalPages;
  }
}

export class HttpPaginationResponse<T> extends HttpResponse<T> {
  meta: Pagination;

  constructor(data: T, status: number, message: string, meta: Pagination) {
    super(data, status, message);
    this.meta = meta;
  }
}
