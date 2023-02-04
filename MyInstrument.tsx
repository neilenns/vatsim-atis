import { FSComponent, Subject } from 'msfssdk';
import { MyComponent } from './MyComponent';
import Vatsim from 'node-vatsim';

class MyInstrument extends BaseInstrument {
  override get templateID(): string {
    return 'MyInstrument';
  }

  public override async connectedCallback(): Promise<void> {
    super.connectedCallback();

    const atis = Subject.create<string>('');
    FSComponent.render(<MyComponent atis={atis}/>, document.getElementById('InstrumentContent'));

    var vatsim = new Vatsim();
    await vatsim.GetV3Data();

    atis.set(vatsim.Data?.PublishedATIS?.[0]?.Text || '');
  }
}

registerInstrument('my-instrument', MyInstrument);