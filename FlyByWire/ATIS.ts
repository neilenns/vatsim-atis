export default interface ATIS {
  /**
   * ICAO for the airport reporting the ATIS information.
   */
  icao: string;
  /**
   * Source for the ATIS. One of: faa, vatsim, ivao, pilotedge.
   */
  source: string;
  /**
   * Combined ATIS for both arrivals and departures.
   */
  combined?: string;
  /**
   * ATIS for arrivals.
   */
  arr?: string;
  /**
   * ATIS for departures.
   */
  dep?: string;
}
