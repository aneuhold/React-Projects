/* eslint-disable react/no-multi-comp */
/* eslint-disable no-eval */
import React from 'react';
import PropTypes from 'prop-types';

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
      input: '0',
      output: '',
      decimalInInput: false,
      outputIsResult: false,
    };

    this.addValue = this.addValue.bind(this);
    this.buttonAction = this.buttonAction.bind(this);
    this.addOperator = this.addOperator.bind(this);
    this.lastOutputCharHasOperator = this.lastOutputCharHasOperator.bind(this);
    this.useClear = this.useClear.bind(this);
    this.useEquals = this.useEquals.bind(this);
    this.addDecimal = this.addDecimal.bind(this);
  }

  buttonAction(buttonStr) {
    const numValRegEx = /[0-9]/;
    if (numValRegEx.test(buttonStr)) {
      this.addValue(buttonStr);
    } else if (buttonStr === '.') {
      this.addDecimal();
    } else if (buttonStr === 'AC') {
      this.useClear();
    } else if (buttonStr === '=') {
      this.useEquals();
    } else {
      this.addOperator(buttonStr);
    }
  }

  /**
   * Adds a value to the input and output. If the result is currently showing, then adding
   * a value will clear the output and input.
   * @param {string} valStr - A string containing one char that is from 0-9.
   */
  addValue(valStr) {
    if (this.state.outputIsResult) {
      this.setState({
        output: '',
        input: '',
        outputIsResult: false,
        decimalInInput: false,
      });
    }
    if (valStr === '0' && /^0$|[+/x-]/.test(this.state.input)) {
      return;
    }
    if (/^0$|[+/x-]/.test(this.state.input)) {
      this.setState(previousState => ({
        input: valStr,
        output: previousState.output + valStr,
      }));
    } else {
      this.setState(previousState => ({
        input: previousState.input + valStr,
        output: previousState.output + valStr,
      }));
    }
  }

  addDecimal() {
    if (this.state.decimalInInput === true) {
      return;
    }
    if (this.lastOutputCharHasOperator()) {
      this.setState(previousState => ({
        output: `${previousState.output}0.`,
        input: '0.',
      }));
    } else {
      this.setState(previousState => ({
        output: `${previousState.output}.`,
        input: `${previousState.input}.`,
      }));
    }
    this.setState({
      decimalInInput: true,
    });
  }

  useClear() {
    this.setState({
      output: '',
      input: '0',
      decimalInInput: false,
      outputIsResult: false,
    });
  }

  useEquals() {
    if (this.state.outputIsResult) {
      return;
    }
    let newOutput = '';
    if (this.lastOutputCharHasOperator()) {
      newOutput = this.state.output.slice(0, this.state.output.length - 1);
    } else {
      newOutput = this.state.output.slice();
    }
    newOutput = newOutput.replace(/[x]/g, '*');
    const result = eval(newOutput);
    newOutput = newOutput.replace(/[*]/g, 'x');
    newOutput += `=${result}`;
    this.setState({
      output: newOutput,
      input: result.toString(),
      outputIsResult: true,
      decimalInInput: false,
    });
  }

  addOperator(operatorStr) {
    if (this.state.outputIsResult) {
      this.setState(previousState => ({
        output: previousState.input + operatorStr,
        decimalInInput: false,
        outputIsResult: false,
      }));
    } else if (this.lastOutputCharHasOperator()) {
      this.setState((previousState) => {
        const previousOutput = previousState.output.slice();
        let newOutput = previousOutput
          .split('');
        newOutput[newOutput.length - 1] = operatorStr;
        newOutput = newOutput.join('');
        return {
          output: newOutput,
        };
      });
    } else {
      this.setState(previousState => ({
        output: previousState.output + operatorStr,
        decimalInInput: false,
      }));
    }
    this.setState({
      input: operatorStr,
    });
  }

  // Returns true if the last value of the output is an operator.
  lastOutputCharHasOperator() {
    const { output } = this.state;
    if (/[/+\-x]/.test(output.charAt(output.length - 1))) {
      return true;
    }
    return false;
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
      minHeight: '1.2em',
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
        'seven eight nine subtract'
        'four five six add'
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
      gridArea="subtract"
      buttonText="-"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="add"
      buttonText="+"
      buttonAction={props.buttonAction}
    />
    <Button
      gridArea="multiply"
      buttonText="x"
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
        id={this.props.gridArea}
      >
        {this.props.buttonText}
      </button>
    );
  }
}

export default App;
