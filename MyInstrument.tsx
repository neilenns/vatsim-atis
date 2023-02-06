import { FSComponent, Subject } from 'msfssdk';
import { MyComponent } from './MyComponent';

class MyInstrument extends BaseInstrument {
  override get templateID(): string {
    return 'MyInstrument';
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    const atis = Subject.create<string>('Hello world');
    FSComponent.render(<MyComponent atis={atis} />, document.getElementById('InstrumentContent'));

    const xhr = new XMLHttpRequest();
    const icao = "KPDX";
    const source ="faa";

    xhr.open("GET", `https://api.flybywiresim.com/atis/${icao}?source=${source}`);
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const result = xhr.response as ATIS;
        atis.set(result.combined ?? "");
        console.log(xhr.response);
      }
    };
    xhr.send();
  }
}

registerInstrument('my-instrument', MyInstrument);