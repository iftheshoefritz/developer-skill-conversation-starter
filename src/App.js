import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      answer: null,
      questions: [
        "swap between open files in multiple repositories without having to close down a terminal or editor",
        "can search for text in a configuration file anywhere on my computer from the command line, without knowing the name of the file",
        "can search for a line of code in a specific project or directory",
        "can output the contents of a file to the terminal without opening up a an editor",
        "can easily perform find and replace across multiple files in a project",
        "can edit, remove or rename files from a terminal",
        "can install a missing package",
        "When I often run several commands in the same way, I am comfortable with automating the process (e.g. in a bash script)",
        "When I often run a complicated command with many options, I am comfortable with wrapping it in a simpler script",
        "When I occasionally run a complicated command with many options, I can easily find the exact command I ran the previous time (e.g. from notes or from terminal history)",
                   "Can manage file ownership and permissions"
      ],
      questionIndex: null
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state.questionIndex = Math.floor(Math.random() * this.state.questions.length);
  }

  render() {
    const options = [
      "I did not know this was something important",
      "I did not know this was possible",
      "I need help doing this",
      "I do this often",
      "I do this often and can teach others",
      "I think this is undesirable"
    ];


    return (
        <div className="App">
          <header className="App-header">
            Developer skill conversation starter
            <p className="App-text">{this.state.questions[this.state.questionIndex]}</p>
            <form onSubmit={this.handleFormSubmit}>
              {
                options.map((option, i) => {
                  return (
                      <div className="radio" key={i}>
                      <label>
                      <input type="radio" value={options[i]} checked={this.state.selectedOption === options[i]} onChange={this.handleOptionChange.bind(this)} />{options[i]}
                      </label>
                    </div>
                  )
                })
              }
              <button className="btn btn-default" type="submit" onSubmit={this.handleFormSubmit}>Save</button>
            </form>
          </header>
        </div>
    );
  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();

    console.log('You have selected:', this.state.selectedOption);
  }

}

export default App;
