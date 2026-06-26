import { Component } from 'react';
import Count from './Count';
import InlineInput from './InlineInput';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: self.crypto.randomUUID(),
          name: 'Just some demo tasks',
          edit: false,
        },
        {
          id: self.crypto.randomUUID(),
          name: 'As an example',
          edit: false,
        },
      ],
      inputVal: '',
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({
        id: self.crypto.randomUUID(),
        name: state.inputVal,
        edit: false,
      }),
      inputVal: '',
    }));
  }

  handleUpdate(target, val) {
    this.setState((state) => ({
      ...state,
      todos: this.state.todos.map((item) => {
        let updated = { id: item.id, name: item.name, edit: item.edit };
        if (item.id == target) {
          updated.name = val;
          updated.edit = false;
        }
        return updated;
      }),
    }));
  }

  handleEdit(target) {
    this.setState((state) => ({
      ...state,
      todos: this.state.todos.map((item) => {
        let updated = { id: item.id, name: item.name, edit: item.edit };
        if (item.id == target) updated.edit = !item.edit;
        return updated;
      }),
    }));
  }

  handleDelete(target) {
    this.setState((state) => ({
      ...state,
      todos: this.state.todos.filter((item) => item.id != target),
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <Count count={this.state.todos.length} />
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <div key={todo.name} className="litem">
              {todo.edit ? (
                <InlineInput
                  initial={todo.name}
                  handleUpdate={(val) => {
                    this.handleUpdate(todo.id, val);
                  }}
                  handleCancel={(e) => {
                    e.preventDefault();
                    this.handleEdit(todo.id);
                  }}
                />
              ) : (
                <>
                  <li key={todo.id}>{todo.name}</li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleEdit(todo.id);
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleDelete(todo.id);
                    }}
                  >
                    delete
                  </button>
                </>
              )}
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
