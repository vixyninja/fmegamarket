export interface IHttpResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface Meta {
  _page: number;
  _limit: number;
  _total: number;
  _total_page: number;
}

export class HttpResponse<T> implements IHttpResponse<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class HttpPaginationResponse<T> implements IHttpResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  meta: Meta;

  constructor(statusCode: number, message: string, data: T, meta: Meta) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
