const BASE_URL = "https://ya-praktikum.tech/api/v2";

enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface Options {
  method?: METHODS;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  credentials?: boolean;
}

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data).filter((key) => data[key] !== undefined);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HTTPTransport {
  baseUrl: string;

  constructor() {
    this.baseUrl = BASE_URL;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (
    url: string,
    options: Options,
    timeout = 5000,
  ): Promise<XMLHttpRequest> => {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method as string,
        method === METHODS.GET && !!data
          ? `${url}${queryStringify(data as Record<string, unknown>)}`
          : url,
      );

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.withCredentials = true;
      xhr.responseType = "json";

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
