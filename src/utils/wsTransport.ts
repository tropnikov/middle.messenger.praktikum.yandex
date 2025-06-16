import { EventBus } from "@/framework/EventBus";

export enum WebSocketEvents {
  Open = "open",
  Close = "close",
  Connected = "connected",
  Message = "message",
  Error = "error",
}

export class WSTransport extends EventBus {
  private socket: WebSocket | null = null;
  private url: string;
  private interval: number | NodeJS.Timeout | undefined;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public connect() {
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setPing();

    return new Promise<void>((resolve, reject) => {
      this.on(WebSocketEvents.Error, reject);
      this.on(WebSocketEvents.Connected, () => resolve());
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener(WebSocketEvents.Open, () => {
      this.emit(WebSocketEvents.Connected);
    });

    socket.addEventListener(WebSocketEvents.Close, () => {
      this.emit(WebSocketEvents.Close);
    });

    socket.addEventListener(WebSocketEvents.Error, (event: Event) => {
      console.error("Ошибка", event);
      this.emit(WebSocketEvents.Error, event);
    });

    socket.addEventListener(WebSocketEvents.Message, (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        if (["pong", "user connected"].includes(data?.type)) {
          return;
        }

        this.emit(WebSocketEvents.Message, data);
      } catch (error) {
        console.error(error);
      }
    });
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Соединение не установлено");
    }

    this.socket.send(JSON.stringify(data));
  }

  private setPing() {
    this.interval = setInterval(() => {
      this.send({ type: "ping" });
    }, 3000);

    this.on(WebSocketEvents.Close, () => {
      clearInterval(this.interval);
      this.interval = 0;
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.interval);
  }
}
