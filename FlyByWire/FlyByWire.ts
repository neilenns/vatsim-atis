import type ATIS from "./ATIS.js";
import Controller from "./Controller.js";
import { distanceBetweenTwoPointsInMiles, LatLong } from "./Utilities.js";

export enum FlyByWireSource {
  VATSIM = "vatsim",
  FAA = "faa",
  IVAO = "ivao",
  PILOTEDGE = "pilotedge",
}

export default class FlyByWire {
  private _controllers: Controller[] = [];

  constructor(public source?: FlyByWireSource) {}

  /**
   * Fetches the list of online controllers from the specified source.
   * @throws Error if FlyByWire.Source isn't set before calling.
   * @throws Error if FlyByWire.Source isn't one of VATSIM or IVAO.
   */
  public async fetchControllers() {
    if (this.source == undefined) {
      throw new Error(
        "FlyByWire.Source must be set before fetching controllers"
      );
    }

    if (
      this.source == FlyByWireSource.FAA ||
      this.source == FlyByWireSource.PILOTEDGE
    ) {
      throw new Error(
        `${this.source} is not supported for controllers. Use VATSIM or IVAO instead.`
      );
    }

    const response = await fetch(
      `https://api.flybywiresim.com/api/v1/atc?source=${this.source}`
    );
    // This only assigns the type, it doesn't make actual objects.
    var rawControllers = (await response.json()) as Controller[];
    rawControllers.forEach((rawController) =>
      this._controllers.push(new Controller(rawController))
    );
  }

  /**
   * Finds an online controller with the specified callsign.
   * @param callsign The callsign of the controller to find.
   * @returns The controller, or undefined if there is no match.
   */
  public getControllerByCallsign(callsign: string): Controller | undefined {
    return this._controllers?.find(
      (controller) => controller.callsign === callsign
    );
  }

  /**
   * Finds all controllers whose visual range places them within the range of the specified position.
   * @param position The position to use when calculating distance to visible controllers.
   * @returns A list of controllers whose visual range is within the specified position, or an empty list if none are found.
   */
  public getControllersInVisualRange(
    position: LatLong
  ): Controller[] | undefined {
    return this._controllers?.filter(
      (controller) =>
        distanceBetweenTwoPointsInMiles(controller.location, position) <
        controller.visualRange
    );
  }

  /**
   * Retrieves the current ATIS for the specified airport code.
   * @param icao The airport code to retrieve the ATIS for.
   */
  public async getAtis(icao: string): Promise<ATIS> {
    if (this.source == undefined) {
      throw new Error(
        "FlyByWire.Source must be set before requesting ATIS information."
      );
    }

    const response = await fetch(
      `https://api.flybywiresim.com/atis/${icao}?source=${this.source}`
    );
    return (await response.json()) as ATIS;
  }
}
