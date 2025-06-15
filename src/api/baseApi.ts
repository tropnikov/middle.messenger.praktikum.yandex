import { HTTPTransport } from "@/utils/httpTransport";

export class BaseAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }
}
