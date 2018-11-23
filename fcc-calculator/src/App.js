/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

// Lets add some tasty monospaced font for the calculator at some point.

const App = () => (
  <div
    className="App"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Roboto', sans-serif",
      margin: 0,
      padding: 0,
      height: '100vh',
      width: '100%',
    }}
  >
    <Calculator />
  </div>
);

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: 0,
      input: '0',
      output: '0',
    };

    this.addValue = this.addValue.bind(this);
    this.buttonAction = this.buttonAction.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  buttonAction(buttonStr) {
    const numValRegEx = /[.0-9]/;
    if (numValRegEx.test(buttonStr)) {
      console.log('Returned true on regex');
    }
  }

  addValue(valStr) {
    if (this.state.input === '0' || valStr === '0') {
      return;
    } if (this.state.input === '0') {
      this.setState({
        input: '',
      });
    }
    this.setState(previousState => ({
      input: previousState.input.append(valStr),
    }));
  }

  // useOperator(operatorStr) {

  // }

  render() {
    return (
      <div
        style={{
          width: '300px',
          height: '300px',
        }}
      >
        <Display
          input={this.state.input}
          output={this.state.output}
        />
        <Buttons
          buttonAction={this.buttonAction}
        />
      </div>
    );
  }
}

// eslint-disable-next-line react/prefer-stateless-function
class Display extends React.Component {
  static propTypes = {
    input: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div
        style={{
          padding: '10px',
          textAlign: 'right',
          border: '1px solid black',
        }}
      >
        <Output
          output={this.props.output}
        />
        <Input
          input={this.props.input}
        />
      </div>
    );
  }
}

const Input = props => (
  <div>
    {props.input}
  </div>
);
Input.propTypes = {
  input: PropTypes.string.isRequired,
};

const Output = props => (
  <div
    style={{
      fontSize: '0.8em',
      marginBottom: '5px',
    }}
  >
    {props.output}
  </div>
);
Output.propTypes = {
  output: PropTypes.string.isRequired,
};

const Buttons = props => (
  // [TODO] Enter will be equal
  // [TODO] The numbers on the keyboard should be mapped
  // [TODO] The keys QWEASDZXC should also be mapped to 1-9 and V should be 0.
  // [TODO] Add the css so that the button will get a little bigger when it is hovered over.
  <div
    style={{
      display: 'grid',
      gridTemplateAreas: `
        'clear clear divide multiply'
        'seven eight nine minus'
        'four five six plus'
        'one two three equals'
        'zero zero decimal equals'
      `,
      height: '100%',
    }}
  >
    <Button
      gridArea="clear"
      buttonText="AC"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="divide"
      buttonText="/"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="minus"
      buttonText="-"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="plus"
      buttonText="+"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="multiply"
      buttonText="X"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="equals"
      buttonText="="
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="nine"
      buttonText="9"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="eight"
      buttonText="8"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="seven"
      buttonText="7"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="six"
      buttonText="6"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="five"
      buttonText="5"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="four"
      buttonText="4"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="three"
      buttonText="3"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="two"
      buttonText="2"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="one"
      buttonText="1"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="zero"
      buttonText="0"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="decimal"
      buttonText="."
      buttonAction={props.buttonAction}
    />
  </div>
);
Buttons.propTypes = {
  buttonAction: PropTypes.func.isRequired,
};

class Button extends React.Component {
  static propTypes = {
    gridArea: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
  }

  static propTypes = {
    buttonAction: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.normalStyle = {
      border: '1px solid green',
      gridArea: props.gridArea,
      outline: 'none',
      fontSize: '1.3em',
    };
    this.hoverStyle = Object.assign({
      transform: 'scale(1.1)',
    }, this.normalStyle);

    this.state = {
      style: this.normalStyle,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMouseEnter() {
    const { hoverStyle } = this;
    this.setState({
      style: hoverStyle,
    });
  }

  handleMouseLeave() {
    const { normalStyle } = this;
    this.setState({
      style: normalStyle,
    });
  }

  handleClick() {
    this.props.buttonAction(this.props.buttonText);
  }

  render() {
    return (
      <button
        style={this.state.style}
        type="button"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        {this.props.buttonText}
      </button>
    );
  }
}

export default App;
