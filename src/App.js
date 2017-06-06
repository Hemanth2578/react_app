import React, { Component, PureComponent } from 'react';
import { Provider, connect } from 'react-redux';

import { someAsyncAction } from './redux/reducers';
import logo from './logo.svg';
import './App.css';
import store from './redux/store';
import Children from './Children';

class DumnTest extends PureComponent {
  state = {
    value: '',
  }

  onInputChange(e) {
    const nextVal = e.target.value;

    this.setState({ value: nextVal });
  }

  render() {
    const { onUpdate } = this.props;

    return (
      <div>
        <input
          value={this.state.value}
          onChange={(e) => this.onInputChange(e)}
        />

        < button onClick={() => onUpdate(this.state.value)}> set value</button>
      </div>
    );
  }
}

function Test(props) {
  if (props.loading) {
    return (<h1> LOADING ... </h1>);
  }
  return (
    <div>
      <h1> {props.value} </h1>

      <DumnTest onUpdate={props.onUpdate} />
    </div>
  );
}

const Hoc = connect(
  (storeState) => ({
    value: !storeState.value ? 'Empty' : storeState.value,
    loading: storeState.loading,
  }),
  { onUpdate: someAsyncAction },
);
const TestWithRedux = Hoc(Test);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <TestWithRedux />
        <Children />
      </div>
    );
  }
}

export default () =>
  <Provider store={store}>
    <App />
  </Provider>;
