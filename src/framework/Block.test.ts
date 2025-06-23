import { expect } from "chai";
import sinon from "sinon";
import { Block } from "./Block";
import { EventBus } from "./EventBus";

class TestBlock extends Block {
  render(): string {
    return '<div class="test-block">{{content}}</div>';
  }

  public addAttributesPublic(): void {
    return this.addAttributes();
  }

  public getRenderResult(): string {
    return this.render();
  }

  componentDidMount(): void {
    return;
  }
}

describe("Block", () => {
  let testBlock: TestBlock;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    testBlock = new TestBlock({
      content: "New тест",
      events: {
        click: sinon.spy(),
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Конструктор", () => {
    it("экземпляр Block создается с корректными свойствами", () => {
      expect(testBlock).to.be.instanceof(Block);
      expect(testBlock.props.events).to.have.property("click");
      expect(testBlock.props.content).to.equal("New тест");
      const element = testBlock.getContent();
      expect(element.textContent).to.equal("New тест");
    });
  });

  describe("EventBus интеграция", () => {
    it("создается экземпляр EventBus", () => {
      expect(testBlock.eventBus()).to.be.instanceof(EventBus);
    });

    it("событие init вызывается при создании", () => {
      const initSpy = sandbox.spy(testBlock.eventBus(), "emit");
      testBlock.eventBus().emit(Block.EVENTS.INIT);
      expect(initSpy.calledWith(Block.EVENTS.INIT)).to.equal(true);
    });

    it("события корректно регистрируются", () => {
      const eventBus = testBlock.eventBus();
      const onSpy = sandbox.spy(eventBus, "on");
      const newBlock = new TestBlock();
      newBlock.eventBus = () => eventBus;

      (
        newBlock as unknown as { _registerEvents: (eventBus: EventBus) => void }
      )._registerEvents(eventBus);

      expect(onSpy.callCount).to.equal(4);
    });

    it("_addEvents вызывается при рендеринге компонента", () => {
      const clickHandler = sandbox.stub();
      const addEventsSpy = sandbox.spy();

      const block = new TestBlock({ events: { click: clickHandler } });

      (block as unknown as { _addEvents: () => void })._addEvents =
        addEventsSpy;
      (block as unknown as { init: () => void }).init();

      expect(addEventsSpy.calledOnce).to.equal(true);
    });

    it("_removeEvents вызывается при размонтировании", () => {
      const clickHandler = sandbox.stub();
      const removeEventsSpy = sandbox.spy();

      const block = new TestBlock({ events: { click: clickHandler } });

      (block as unknown as { _removeEvents: () => void })._removeEvents =
        removeEventsSpy;
      (block as unknown as { _removeEvents: () => void })._removeEvents();

      expect(removeEventsSpy.calledOnce).to.equal(true);
    });

    it("event listeners добавляются к DOM элементу", () => {
      const clickHandler = sandbox.stub();
      const mockElement = document.createElement("div");
      const addEventListenerSpy = sandbox.spy(mockElement, "addEventListener");

      const block = new TestBlock({ events: { click: clickHandler } });
      (block as unknown as { _element: HTMLElement })._element = mockElement;
      (block as unknown as { _addEvents: () => void })._addEvents();

      expect(addEventListenerSpy.calledWith("click", clickHandler)).to.equal(
        true,
      );
      expect(addEventListenerSpy.calledOnce).to.equal(true);
    });

    it("event listeners удаляются с DOM элемента", () => {
      const clickHandler = sandbox.stub();
      const mockElement = document.createElement("div");
      const removeEventListenerSpy = sandbox.spy(
        mockElement,
        "removeEventListener",
      );

      const block = new TestBlock({ events: { click: clickHandler } });
      (block as unknown as { _element: HTMLElement })._element = mockElement;
      (block as unknown as { _removeEvents: () => void })._removeEvents();

      expect(removeEventListenerSpy.calledWith("click", clickHandler)).to.equal(
        true,
      );
      expect(removeEventListenerSpy.calledOnce).to.equal(true);
    });
  });

  describe("Рендеринг", () => {
    it("возвращает корректный HTML", () => {
      expect(testBlock.getRenderResult()).to.equal(
        '<div class="test-block">{{content}}</div>',
      );
    });
  });

  describe("setProps", () => {
    it("обновляет props и рендерит новый контент", () => {
      const newContent = "Newer тест";

      testBlock.setProps({ content: newContent });

      expect(testBlock.props.content).to.equal(newContent);
      const element = testBlock.getContent();
      expect(element.textContent).to.equal(newContent);
    });
  });

  describe("Жизненный цикл компонента", () => {
    it("componentDidMount вызывается при dispatchComponentDidMount", () => {
      const componentDidMountSpy = sandbox.spy(testBlock, "componentDidMount");

      testBlock.dispatchComponentDidMount();

      expect(componentDidMountSpy.callCount).to.equal(1);
    });

    it("dispatchComponentDidMount вызывается для дочерних компонентов", () => {
      const childBlock = new TestBlock();
      const dispatchSpy = sandbox.spy(childBlock, "dispatchComponentDidMount");

      const parentBlock = new TestBlock({ child: childBlock });
      parentBlock.dispatchComponentDidMount();

      expect(dispatchSpy.callCount).to.equal(1);
    });
  });

  describe("показ и скрытие элемента", () => {
    it("show показывает элемент", () => {
      const mockElement = document.createElement("div");
      mockElement.style.display = "inline";
      const renderSpy = sandbox.stub();
      const emitSpy = sandbox.spy(testBlock.eventBus(), "emit");

      (testBlock as unknown as { _element: HTMLElement })._element =
        mockElement;
      testBlock.show("test", renderSpy);

      expect(renderSpy.calledOnce).to.equal(true);
      expect(emitSpy.calledWith("init")).to.equal(true);
      const content = testBlock.getContent();
      expect(content.style.display).to.equal("block");
    });

    it("hide скрывает элемент", () => {
      const mockElement = document.createElement("div");

      (testBlock as unknown as { _element: HTMLElement })._element =
        mockElement;
      testBlock.hide();

      expect(mockElement.style.display).to.equal("none");
    });
  });
});
