type EventMap = Record<string, any>;

type Events = {
  proofsUpdated: undefined;
};

export class EventManager<TEvents extends EventMap> {
  private static instance: EventManager<any>;
  private subMap: { [K in keyof TEvents]?: ((data: TEvents[K]) => void)[] } =
    {};

  private constructor() {}

  emit<K extends keyof TEvents>(name: K, data: TEvents[K]): void {
    if (this.subMap[name]) {
      this.subMap[name]?.forEach((cb) => cb(data));
    }
  }

  on<K extends keyof TEvents>(name: K, cb: (data: TEvents[K]) => void): void {
    if (Array.isArray(this.subMap[name])) {
      this.subMap[name]?.push(cb);
    } else {
      this.subMap[name] = [cb];
    }
  }

  off<K extends keyof TEvents>(name: K, cb: (data: TEvents[K]) => void): void {
    if (this.subMap[name]) {
      this.subMap[name] = this.subMap[name]?.filter(
        (listener) => listener !== cb,
      );
    }
  }

  clear(name?: keyof TEvents): void {
    if (name) {
      delete this.subMap[name];
    } else {
      this.subMap = {};
    }
  }

  static getInstance(): EventManager<Events> {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager<Events>();
    }
    return EventManager.instance;
  }
}
