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
  }

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
        <Buttons />
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

const Buttons = () => (
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
    />
    <Button
      gridArea="divide"
      buttonText="/"
    />
    <Button
      gridArea="minus"
      buttonText="-"
    />
    <Button
      gridArea="plus"
      buttonText="+"
    />
    <Button
      gridArea="multiply"
      buttonText="X"
    />
    <Button
      gridArea="equals"
      buttonText="="
    />
    <Button
      gridArea="nine"
      buttonText="9"
    />
    <Button
      gridArea="eight"
      buttonText="8"
    />
    <Button
      gridArea="seven"
      buttonText="7"
    />
    <Button
      gridArea="six"
      buttonText="6"
    />
    <Button
      gridArea="five"
      buttonText="5"
    />
    <Button
      gridArea="four"
      buttonText="4"
    />
    <Button
      gridArea="three"
      buttonText="3"
    />
    <Button
      gridArea="two"
      buttonText="2"
    />
    <Button
      gridArea="one"
      buttonText="1"
    />
    <Button
      gridArea="zero"
      buttonText="0"
    />
    <Button
      gridArea="decimal"
      buttonText="."
    />
  </div>
);

class Button extends React.Component {
  static propTypes = {
    gridArea: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
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

  render() {
    return (
      <button
        style={this.state.style}
        type="button"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.buttonText}
      </button>
    );
  }
}

export default App;
