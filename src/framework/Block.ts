import { v4 as makeUUID } from "uuid";
import { EventBus } from "./EventBus.ts";

import Handlebars from "handlebars";

export type Props = Record<string, unknown>;

export interface IMeta {
  tagName: string | null;
  props: Props;
}

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _id: string;
  private _element: HTMLElement | null = null;

  children: Record<string, Block>;
  lists: Record<string, unknown[]>;
  props: Props;
  eventBus: () => EventBus;

  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();

    const { props, children, lists } =
      this._getChildrenAndProps(propsWithChildren);
    this._id = makeUUID();
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, EventListener>;
    };

    Object.keys(events).forEach((e) => {
      if (this._element) {
        this._element.addEventListener(e, events[e]);
      }
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as {
      events: Record<string, EventListener>;
    };

    if (!events) return;

    Object.keys(events).forEach((e) => {
      if (this._element) {
        this._element.removeEventListener(e, events[e]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {
    return;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate() {
    return true;
  }

  private _getChildrenAndProps(propsWithChildren: Props): {
    children: Record<string, Block>;
    props: Props;
    lists: Record<string, unknown[]>;
  } {
    const children: Record<string, Block> = {};
    const props: Props = {};
    const lists: Record<string, unknown[]> = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  protected addAttributes(): void {
    const attr = this.props.attr as Record<string, unknown>;

    if (!attr) return;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs = { ...this.props };
    const _tmpId = makeUUID();

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement("template");
      child.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._removeEvents();
    this._addEvents();
    this.addAttributes();
  }

  protected render(): string {
    return "";
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error("Элемент не создан");
    }
    return this._element;
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }
}
