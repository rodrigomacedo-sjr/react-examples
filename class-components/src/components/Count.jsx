import { Component } from 'react';

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1 className="count">{this.props.count}</h1>;
  }
}

export default Count;
