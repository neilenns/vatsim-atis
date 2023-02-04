import { FSComponent, DisplayComponent, VNode, ComponentProps, Subscribable } from 'msfssdk';
import './MyComponent.css';

interface MyComponentProps extends ComponentProps {
  atis: Subscribable<string>;
}

export class MyComponent extends DisplayComponent<MyComponentProps> {
  public render(): VNode {
    return (
      <div class='my-component'>{this.props.atis}</div>
    );
  }
}