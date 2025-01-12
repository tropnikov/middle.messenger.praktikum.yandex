enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface Options {
  method?: METHODS;
  data?: Record<string, unknown> | XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
  timeout?: number;
}

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
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

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value as string);
      });

      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  };
}
