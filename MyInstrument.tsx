import { FSComponent, Subject } from 'msfssdk';
import FlyByWire, { FlyByWireSource } from './FlyByWire/FlyByWire';
import { MyComponent } from './MyComponent';

class MyInstrument extends BaseInstrument {
  override get templateID(): string {
    return 'MyInstrument';
  }

  public override async connectedCallback() {
    super.connectedCallback();

    const atis = Subject.create<string>('Hello world');
    FSComponent.render(<MyComponent atis={atis} />, document.getElementById('InstrumentContent'));

    var fbw = new FlyByWire(FlyByWireSource.FAA);
    atis.set((await fbw.getAtis("KSEA")).combined ?? "");
  }
}

registerInstrument('my-instrument', MyInstrument);