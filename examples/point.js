import React from 'react';
import { alignPoint } from '../src';
import ReactDOM from 'react-dom';

class Demo extends React.Component {
  state = {
    sy: 't',
    sx: 'l',
  };

  onChangeY = ({ target: { value } }) => {
    this.setState({ sy: value });
  };

  onChangeX = ({ target: { value } }) => {
    this.setState({ sx: value });
  };

  onClick = (event) => {
    const { sx, sy } = this.state;
    const { clientX, clientY } = event;

    alignPoint(
      this.$rect,
      { clientX, clientY },
      {
        points: [`${sy}${sx}`],
      },
    );
  };

  rectRef = (ele) => {
    this.$rect = ele;
  };

  render() {
    const { sx, sy } = this.state;

    return (
      <div>
        <div>
          Source:
          <select value={sy} onChange={this.onChangeY}>
            <option value="t">t (Top)</option>
            <option value="c">c (Center)</option>
            <option value="b">b (Bottom)</option>
          </select>
          <select value={sx} onChange={this.onChangeX}>
            <option value="t">l (Left)</option>
            <option value="c">c (Center)</option>
            <option value="b">r (Right)</option>
          </select>
        </div>

        <div
          onClick={this.onClick}
          style={{ border: '1px solid black', textAlign: 'center', margin: 20, padding: '150px 0' }}
        >
          <div
            ref={this.rectRef}
            style={{ background: 'red', position: 'fixed', width: 50, height: 50 }}
          />
          Click me please!
        </div>

      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
