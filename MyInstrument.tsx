import { FSComponent, Subject } from 'msfssdk';
import { MyComponent } from './MyComponent';
// import type Server from 'node-vatsim/Server';

class MyInstrument extends BaseInstrument {
  override get templateID(): string {
    return 'MyInstrument';
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    const atis = Subject.create<string>('Hello world');
    FSComponent.render(<MyComponent atis={atis} />, document.getElementById('InstrumentContent'));

    const xhr = new XMLHttpRequest();
//    xhr.open("GET", "https://status.vatsim.net/status.json", true);
//    xhr.open("GET", "https://datis.clowd.io/api/kpdx", true);
      xhr.open("GET", "https://www.simbrief.com/api/xml.fetcher.php?userid=369503&json=1");
      xhr.responseType = "json";
      xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//        const data = xhr.response as Server;
        atis.set(JSON.stringify(xhr.response));
        console.log(xhr.response);
      }
    };
    xhr.send();
  }
}

registerInstrument('my-instrument', MyInstrument);