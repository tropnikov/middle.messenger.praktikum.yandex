import { afterEach, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import Router, { Route } from "./Router";
import { Block } from "./Block";

class MockBlock extends Block {
  render() {
    return "<div>Mock Block</div>";
  }
}

class AnotherMockBlock extends Block {
  render() {
    return "<div>Another Mock Block</div>";
  }
}

describe("Создание экземпляра Router", () => {
  it("создает экземпляр Router", () => {
    const router = Router;
    expect(router).to.be.an("object");
  });

  it("работает как singleton", () => {
    const router1 = Router;
    const router2 = Router;

    expect(router1).to.equal(router2);
  });
});

describe("Router", () => {
  let router: typeof Router;

  beforeEach(() => {
    router = Router;
  });

  it("добавляет роуты в список используя use()", () => {
    const result = router
      .use("/test", MockBlock)
      .use("/test2", AnotherMockBlock);

    expect(result).to.equal(router);
    expect(router.getRoute("/test")).to.be.an("object");
    expect(router.getRoute("/test")?.pathname).to.equal("/test");
    expect(router.getRoute("/test2")?.pathname).to.equal("/test2");
  });

  describe("Метод getRoute()", () => {
    beforeEach(() => {
      router.use("/", MockBlock).use("/test", AnotherMockBlock);
    });

    it("возвращает роут если он существует", () => {
      const route = router.getRoute("/test");

      expect(route).to.not.equal(undefined);
      expect(route?.pathname).to.equal("/test");

      const route2 = router.getRoute("/nonexistent");

      expect(route2).to.equal(undefined);
    });
  });

  describe("Метод go()", () => {
    let pushStateStub: sinon.SinonStub;
    let onRouteStub: sinon.SinonStub;

    beforeEach(() => {
      router.use("/test", MockBlock);

      pushStateStub = sinon.stub(window.history, "pushState");
      onRouteStub = sinon.stub(router, "_onRoute");
    });

    afterEach(() => {
      pushStateStub.restore();
      onRouteStub.restore();
    });

    it("меняет URL в адресной строке", () => {
      router.go("/test");

      expect(pushStateStub.calledOnce).to.equal(true);
      expect(pushStateStub.calledWith({}, "", "/test")).to.equal(true);
    });

    it("вызывает _onRoute", () => {
      router.go("/test");

      expect(onRouteStub.calledOnce).to.equal(true);
      expect(onRouteStub.calledWith("/test")).to.equal(true);
    });
  });

  describe("Метод back()", () => {
    it("навигирует по истории назад", () => {
      const backStub = sinon.stub(window.history, "back");
      router.back();
      expect(backStub.calledOnce).to.equal(true);
    });
  });

  describe("Метод forward()", () => {
    it("навигирует по истории вперед", () => {
      const forwardStub = sinon.stub(window.history, "forward");
      router.forward();
      expect(forwardStub.calledOnce).to.equal(true);
    });
  });

  describe("Метод start()", () => {
    let onRouteStub: sinon.SinonStub;

    beforeEach(() => {
      onRouteStub = sinon.stub(router, "_onRoute");
    });

    afterEach(() => {
      onRouteStub.restore();
    });

    it("устанавливает обработчик onpopstate и вызывает _onRoute", () => {
      router.start();

      expect(window.onpopstate).to.be.a("function");
      expect(onRouteStub.calledOnce).to.equal(true);
      expect(onRouteStub.calledWith(window.location.pathname)).to.equal(true);
    });
  });

  describe("Навигация между роутами", () => {
    let route1: Route;
    let route2: Route;
    let leaveStub1: sinon.SinonStub;
    let renderStub1: sinon.SinonStub;
    let renderStub2: sinon.SinonStub;
    let pushStateStub: sinon.SinonStub;

    beforeEach(() => {
      router.use("/route1", MockBlock);
      router.use("/route2", AnotherMockBlock);

      route1 = router.getRoute("/route1") as Route;
      route2 = router.getRoute("/route2") as Route;

      leaveStub1 = sinon.stub(route1, "leave");
      renderStub1 = sinon.stub(route1, "render");
      renderStub2 = sinon.stub(route2, "render");

      pushStateStub = sinon.stub(window.history, "pushState");
    });

    afterEach(() => {
      pushStateStub.restore();
    });

    it("при переходе на новый роут вызывает leave у предыдущего и render у нового", () => {
      router.go("/route1");

      leaveStub1.resetHistory();
      renderStub1.resetHistory();

      router.go("/route2");

      expect(leaveStub1.calledOnce).to.equal(true);
      expect(renderStub2.calledOnce).to.equal(true);
    });
  });
});
