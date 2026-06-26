import { Component } from 'react';

class InlineInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: this.props.initial ?? '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit() {
    this.props.handleUpdate(this.state.inputVal);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="task-entry"
          value={this.state.inputVal}
          onChange={this.handleInputChange}
        />
        <button type="submit">submit</button>
        <button onClick={this.props.handleCancel}>cancel</button>
      </form>
    );
  }
}

export default InlineInput;
