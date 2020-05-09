const endsWithOperator = /[x/+-]$/

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
      prevVal: "0",
      formula: "",
      clickedNumber: false,
      hasDecimal: false,
      clickedSubtract: false,
      clickedEvaluate: false
    }
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleSubtractClick = this.handleSubtractClick.bind(this);
    this.handleDivideClick = this.handleDivideClick.bind(this);
    this.handleMultiplyClick = this.handleMultiplyClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }
  
  handleNumberClick(e){
    if(!this.state.clickedNumber && e.target.innerText !== "0"){
      this.setState({
        currentVal: e.target.innerText,
        formula: e.target.innerText,
        clickedNumber: true,
        clickedSubtract: false,
        clickedEvaluate: false
      })
    } else if(this.state.clickedNumber){
      this.setState({
        currentVal: this.state.currentVal + e.target.innerText,
        formula: this.state.formula + e.target.innerText,
        clickedSubtract: false,
        clickedEvaluate: false
      })
    }
  }
  
  handleAddClick(e){
    let formula = this.state.formula;
    while (endsWithOperator.test(formula)) {
      formula = formula.slice(0, -1);
    } if (this.state.clickedEvaluate) {
      this.setState({
        currentVal: e.target.innerText,
        formula: this.state.prevVal + e.target.innerText,
        hasDecimal: false,
        clickedSubtract: false
      })
    } else {
      this.setState({
        currentVal: e.target.innerText,
        formula: formula + e.target.innerText,
        hasDecimal: false,
        clickedSubtract: false
      })
    }
  }
  
  handleSubtractClick(e){
    if (!this.state.clickedSubtract && this.state.clickedEvaluate) {
      this.setState({
        currentVal: e.target.innerText,
        formula: this.state.prevVal + e.target.innerText,
        hasDecimal: false,
        clickedSubtract: true
      })
    } else if (!this.state.clickedSubtract) {
      this.setState({
        currentVal: e.target.innerText,
        formula: this.state.formula + e.target.innerText,
        hasDecimal: false,
        clickedSubtract: true
      })
    }
  }
  
  handleDivideClick(e){
    let formula = this.state.formula;
    while (endsWithOperator.test(formula)) {
      formula = formula.slice(0, -1);
    }
    if (this.state.clickedEvaluate) {
      this.setState({
        currentVal: e.target.innerText,
        formula: this.state.prevVal + e.target.innerText,
        hasDecimal: false,
        clickedSubtract: false
      })
    } else {
      this.setState({
        currentVal: e.target.innerText,
        formula: formula + e.target.innerText,
        hasDecimal: false,
        clickedSubtract: false
      })
    }
  }
  
  handleMultiplyClick(e){
    let formula = this.state.formula;
    while (endsWithOperator.test(formula)) {
      formula = formula.slice(0, -1);
    }
    if (this.state.clickedEvaluate) {
      this.setState({
        currentVal: e.target.innerText,
        formula: this.state.prevVal + e.target.innerText,
        hasDecimal: false,
        clickedSubtract: false
      })
    } else {
      this.setState({
        currentVal: e.target.innerText,
        formula: formula + e.target.innerText,
        hasDecimal: false,
        clickedSubtract: false
      })
    }
  }
  
  handleEvaluate() {
    function calculate(fn) {
        return new Function('return ' + fn)();
      }
    let expression = this.state.formula;
    expression = expression.replace(/x/g, "*")
    let answer = calculate(expression);
    answer = Math.round(answer * 10000000000) / 10000000000;
    answer == "Infinity" ? answer = "ERROR" : null;
    this.setState({
      currentVal: answer.toString(),
      formula: this.state.formula + "=" + answer,
      hasDecimal: false,
      clickedSubtract: false,
      clickedEvaluate: true,
      prevVal: answer.toString()
    })
  }
  
  handleDecimalClick(e){
    if(!this.state.hasDecimal && this.state.currentVal === "0"){
      this.setState({
        currentVal: "0" + e.target.innerText,
        formula: this.state.formula + "0" + e.target.innerText,
        clickedNumber: true,
        hasDecimal: true
      })
    } else if(!this.state.hasDecimal && this.state.currentVal === "+"){
      this.setState({
        currentVal: "0" + e.target.innerText,
        formula: this.state.formula + "0" + e.target.innerText,
        clickedNumber: true,
        hasDecimal: true
      })
    } else if(!this.state.hasDecimal && this.state.currentVal === "-"){
      this.setState({
        currentVal: "0" + e.target.innerText,
        formula: this.state.formula + "0" + e.target.innerText,
        clickedNumber: true,
        hasDecimal: true
      })
    } else if(!this.state.hasDecimal && this.state.currentVal === "x"){
      this.setState({
        currentVal: "0" + e.target.innerText,
        formula: this.state.formula + "0" + e.target.innerText,
        clickedNumber: true,
        hasDecimal: true
      })
    } else if(!this.state.hasDecimal && this.state.currentVal === "/"){
      this.setState({
        currentVal: "0" + e.target.innerText,
        formula: this.state.formula + "0" + e.target.innerText,
        clickedNumber: true,
        hasDecimal: true
      })
    } else if(!this.state.hasDecimal){
      this.setState({
        currentVal: this.state.currentVal + e.target.innerText,
        formula: this.state.formula + e.target.innerText,
        clickedNumber: true,
        hasDecimal: true
      })
    }
  }
  
  handleClearClick(){
    this.setState({
      currentVal: "0",
      formula: "",
      clickedNumber: false,
      hasDecimal: false,
      clickedSubtract: false,
      clickedEvaluate: false
    })
  }
  
  render() {
    return (
      <div className="wrapper">
        <div className="row">
          <Formula formula={this.state.formula.replace(/x/g, "*")} />
          <Output currentValue={this.state.currentVal} />
        </div>
        <div className="row">
          <button className="wideButton"
            id="clear"
            onClick={this.handleClearClick}
            >AC
          </button>
          <button
            id="divide"
            onClick={this.handleDivideClick}
            >/
          </button>
          <button
            id="multiply"
            onClick={this.handleMultiplyClick}
            >x
          </button>
          </div>
        <div className="row">
          <button
            id="seven"
            onClick={this.handleNumberClick}
            >7
          </button>
          <button
            id="eight"
            onClick={this.handleNumberClick}
            >8
          </button>
          <button
            id="nine"
            onClick={this.handleNumberClick}
            >9
          </button>
          <button
            id="subtract"
            onClick={this.handleSubtractClick}
            >-
          </button>
          </div>
        <div className="row">
          <button
            id="four"
            onClick={this.handleNumberClick}
            >4
          </button>
          <button
            id="five"
            onClick={this.handleNumberClick}
            >5
          </button>
          <button
            id="six"
            onClick={this.handleNumberClick}
            >6
          </button>
          <button
            id="add"
            onClick={this.handleAddClick}
            >+
          </button>
        </div>
        <div className="row">
          <button
            id="one"
            onClick={this.handleNumberClick}
            >1
          </button>
          <button
            id="two"
            onClick={this.handleNumberClick}
            >2
          </button>
          <button
            id="three"
            onClick={this.handleNumberClick}
            >3
          </button>
          <button
            id="decimal"
            onClick={this.handleDecimalClick}
            >.
          </button>
        </div>
        <div className="row">
          <button className="wideButton"
            id="zero"
            onClick={this.handleNumberClick}
            >0
          </button>
          <button className="wideButton"
            id="equals"
            onClick={this.handleEvaluate}
            >=
          </button>
        </div>
        </div>
    );
  }
}

class Output extends React.Component {
  render() {
    return (
      <div className="outputScreen" id="display">
        {this.props.currentValue}
      </div>
    );
  }
}

class Formula extends React.Component {
  render() {
    return <div className="formulaScreen">{this.props.formula}</div>;
  }
}

ReactDOM.render(<Calculator />, document.getElementById("calculator"));