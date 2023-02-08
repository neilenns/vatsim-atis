import type { LatLong } from "./Utilities";

export default class Controller {
  callsign!: string;
  frequency!: string;
  visualRange!: number;
  type!: string;
  latitude!: number;
  longitude!: number;
  textAtis?: string[];

  get atis(): string | undefined {
    return this.textAtis?.join(" ");
  }

  get location(): LatLong {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  constructor(data: Partial<Controller>) {
    Object.assign(this, data);
  }

  public static fromJSON(json: string): Controller {
    const jsonObject = JSON.parse(json);
    return new Controller(jsonObject);
  }
}
