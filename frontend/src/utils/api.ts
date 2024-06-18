const REST_API = import.meta.env.VITE_REST_API;

export type RequestMethod = 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';

export type RequestQueryParams = Record<string, string>;

export type RequestBody = object;

export type RequestAuthorization = { token: string };

export type RequestOptions = {
  queryParams?: RequestQueryParams,
  body?: RequestBody,
  auth?: RequestAuthorization,
};

export class ApiClientError extends Error {}

export class ApiClientHttpStatusError extends ApiClientError {
  public readonly response: Response;
  public readonly statusCode: number;
  public readonly statusText: string;

  public constructor(response: Response) {
    super(`HTTP Response Error: ${response.status} ${response.statusText}`);
    this.response = response;
    this.statusCode = response.status;
    this.statusText = response.statusText;
  }
}

export class ApiClient {
  private readonly BASE_URL: string;

  constructor(baseUrl: string) {
    this.BASE_URL = baseUrl;
  }

  public async request(method: RequestMethod, url: string, options?: RequestOptions): Promise<Response> {
    const fullUrl = this.buildFullUrl(url, options?.queryParams);
    const headers = this.buildHeaders(options?.auth);
    const body = this.buildBody(options?.body);

    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
    });

    return this.checkResponseStatus(response);
  }

  public async get(url: string, options?: RequestOptions & { body?: never }): Promise<Response> {
    const fullUrl = this.buildFullUrl(url, options?.queryParams);
    const headers = this.buildHeaders(options?.auth);

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });

    return this.checkResponseStatus(response);
  }

  public async post(url: string, options?: RequestOptions): Promise<Response> {
    return this.request('POST', url, options);
  }

  public async patch(url: string, options?: RequestOptions): Promise<Response> {
    return this.request('PATCH', url, options);
  }

  public async delete(url: string, options?: RequestOptions): Promise<Response> {
    return this.request('DELETE', url, options);
  }

  private buildHeaders(auth?: RequestAuthorization): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (auth?.token) {
      headers['Authorization'] = `Bearer ${auth.token}`;
    }

    return headers;
  }

  private buildFullUrl(url?: string, queryParams?: RequestQueryParams): string {
    let fullUrl = `${this.BASE_URL}/${url}`;
    if (queryParams) {
      fullUrl += `?${new URLSearchParams(queryParams).toString()}`
    }

    return fullUrl;
  }

  private buildBody(body?: RequestBody): string | undefined {
    return body ? JSON.stringify(body) : undefined;
  }

  private async checkResponseStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      throw new ApiClientHttpStatusError(response);
    }

    return response;
  }
}

export const useApiClient = () => new ApiClient(`http://${REST_API}/api/v1`);

export const useResponse = async <T>(response: Response): Promise<T> => {
  return await response.json() as T;
};
