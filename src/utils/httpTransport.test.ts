import { expect } from "chai";
import { afterEach, beforeEach, describe } from "mocha";

import * as sinon from "sinon";
import type {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";

import { HTTPTransport } from "./httpTransport";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];
  let httpTransport: HTTPTransport;
  const url = "/test";

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = (request) => {
      requests.push(request);
    };
    httpTransport = new HTTPTransport();
  });

  afterEach(() => {
    xhr.restore();
    requests = [];
  });

  describe("constructor", () => {
    it("устанавливает базовый URL", () => {
      expect(httpTransport.baseUrl).to.equal(
        "https://ya-praktikum.tech/api/v2",
      );
    });
  });

  describe("GET запросы", () => {
    it("выполняет GET запрос", (done) => {
      httpTransport
        .get(url)
        .then((result) => {
          expect(result).to.deep.equal({ success: true });
          done();
        })
        .catch(done);

      const request = requests[0];

      expect(requests).to.have.lengthOf(1);
      expect(request.method).to.equal("GET");
      expect(request.url).to.equal("https://ya-praktikum.tech/api/v2/test");
      expect(request.requestHeaders).to.have.property("Content-Type");

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"success": true}',
      );
    });

    it("добавляет query параметры для GET запроса, игнорируя undefined значения", (done) => {
      const data = { param1: "value1", param2: undefined, param3: "value3" };

      httpTransport
        .get(url, { data })
        .then(() => {
          done();
        })
        .catch(done);

      expect(requests[0].url).to.equal(
        "https://ya-praktikum.tech/api/v2/test?param1=value1&param3=value3",
      );

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"success": true}',
      );
    });
  });

  describe("POST запросы", () => {
    it("выполняет POST запрос с JSON данными", (done) => {
      const data = { name: "new", value: "test" };

      httpTransport
        .post(url, { data })
        .then((result) => {
          expect(result).to.deep.equal({ id: 1 });
          done();
        })
        .catch(done);

      const request = requests[0];

      expect(request.method).to.equal("POST");
      expect(request.requestBody).to.equal(JSON.stringify(data));
      expect(request.requestHeaders).to.have.property("Content-Type");

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"id": 1}',
      );
    });

    it("выполняет POST запрос с FormData", (done) => {
      const formData = new FormData();
      formData.append("avatar", "avatar.png");

      httpTransport
        .post(url, { data: formData })
        .then((result) => {
          expect(result).to.deep.equal({ uploaded: true });
          done();
        })
        .catch(done);

      const request = requests[0];

      expect(request.method).to.equal("POST");
      expect(request.requestBody).to.equal(formData);
      expect(request.requestHeaders).to.not.have.property("Content-Type");

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"uploaded": true}',
      );
    });
  });

  describe("PUT запросы", () => {
    it("выполняет PUT запрос", (done) => {
      const data = { name: "updated" };

      httpTransport
        .put(url, { data })
        .then((result) => {
          expect(result).to.deep.equal({ updated: true });
          done();
        })
        .catch(done);

      const request = requests[0];

      expect(request.method).to.equal("PUT");
      expect(request.requestBody).to.equal(JSON.stringify(data));

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"updated": true}',
      );
    });
  });

  describe("DELETE запросы", () => {
    it("выполняет DELETE запрос", (done) => {
      httpTransport
        .delete(url)
        .then((result) => {
          expect(result).to.deep.equal({ deleted: true });
          done();
        })
        .catch(done);

      expect(requests[0].method).to.equal("DELETE");

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"deleted": true}',
      );
    });
  });

  describe("заголовки и настройки запроса", () => {
    it("добавляет пользовательские заголовки", (done) => {
      const headers = {
        Authorization: "Bearer token",
      };

      httpTransport
        .get(url, { headers })
        .then(() => {
          done();
        })
        .catch(done);

      expect(requests[0].requestHeaders["Authorization"]).to.equal(
        "Bearer token",
      );

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"success": true}',
      );
    });

    it("передает credentials", (done) => {
      httpTransport
        .get(url)
        .then(() => {
          done();
        })
        .catch(done);

      expect(requests[0].withCredentials).to.equal(true);

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"success": true}',
      );
    });

    it("устанавливает responseType в json", async () => {
      const promise = httpTransport.get(url);

      expect(requests[0]).to.have.property("responseType", "json");

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        '{"success": true}',
      );

      await promise;
    });
  });

  describe("обработка ошибок", () => {
    it("возвращает ошибку при статусе >400", (done) => {
      httpTransport
        .get(url)
        .then(() => {
          done(new Error("Rejected promise"));
        })
        .catch((error) => {
          expect(error).to.deep.equal({ error: "Bad Request" });
          done();
        });

      requests[0].respond(
        400,
        { "Content-Type": "application/json" },
        '{"error": "Bad Request"}',
      );
    });

    it("возвращает ошибку при статусе 500", (done) => {
      httpTransport
        .get(url)
        .then(() => {
          done(new Error("Rejected promise"));
        })
        .catch((error) => {
          expect(error).to.deep.equal({ error: "Internal Server Error" });
          done();
        });

      requests[0].respond(
        500,
        { "Content-Type": "application/json" },
        '{"error": "Internal Server Error"}',
      );
    });

    it("возвращает ошибку при ошибке сети", async () => {
      const promise = httpTransport.get(url);

      requests[0].error();

      try {
        await promise;
        expect.fail("Rejected promise");
      } catch (error) {
        expect(error).to.be.an("error");
      }
    });
  });
});
