import { Block } from "./Block";

export enum Routes {
  AUTH = "/",
  REGISTER = "/sign-up",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  CHANGE_PASSWORD = "/change-password",
  MESSENGER = "/messenger",
  NOT_FOUND = "/404",
  ERROR = "/500",
}

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

const render = (query: string, block: Block) => {
  const root = document.querySelector(query);
  if (root) {
    root.replaceChildren(block.getContent());

    return root;
  }
};

interface IRouteProps {
  rootQuery: string;
}

class Route {
  protected _pathname: string;
  protected _blockClass: typeof Block;
  protected _block: Block | null;
  protected _props: IRouteProps;

  constructor(pathname: string, block: typeof Block, props: IRouteProps) {
    this._pathname = pathname;
    this._blockClass = block;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      this._block.show(this._props.rootQuery, render);
      this._block.dispatchComponentDidMount();
      return;
    }
    this._block.show(this._props.rootQuery, render);
  }
}

class Router {
  protected __instance: this | null = null;
  protected routes: Route[] = [];
  protected history: History = window.history;
  protected _currentRoute: Route | null = null;
  protected _rootQuery = "";

  constructor(rootQuery: string) {
    if (this.__instance) {
      return this.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    this.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
export default new Router("#app");
