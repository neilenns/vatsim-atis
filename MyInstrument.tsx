import { FSComponent, Subject } from 'msfssdk';
import { MyComponent } from './MyComponent';
import type Server from 'node-vatsim/Server';

class MyInstrument extends BaseInstrument {
  override get templateID(): string {
    return 'MyInstrument';
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    const atis = Subject.create<string>('Hello world');
    FSComponent.render(<MyComponent atis={atis} />, document.getElementById('InstrumentContent'));

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://status.vatsim.net/status.json", true);
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const data = xhr.response as Server;
        console.log(data);
      }
    };
    xhr.send();
  }
}

registerInstrument('my-instrument', MyInstrument);