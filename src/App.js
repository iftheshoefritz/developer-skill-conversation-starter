import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      answer: null,
      questions: [
        {id: '668e532a2324084e9a35f999442b1ddd', category: 'workflow', title: 'swap between open files in multiple repositories without having to close down a terminal or editor'},
        {id: '9d64a15c8a1ec1a6425a0399771e5a62', category: 'workflow', title: 'can search for text in a configuration file anywhere on my computer from the command line, without knowing the name of the file'},
        {id: 'feb6c5c7a9dd209caf36d0594357eccb', category: 'workflow', title: 'can search for a line of code in a specific project or directory'},
        {id: '22f4c7047c225466df319ede462dfadc', category: 'workflow', title: 'can output the contents of a file to the terminal without opening up an editor'},
        {id: 'eec24620e5845fef4df68ff0b6d83070', category: 'workflow', title: 'can easily perform find and replace across multiple files in a project'},
        {id: 'ac2e346811f20e02031ebf65228fd0de', category: 'workflow', title: 'can edit, remove or rename files from a terminal'},
        {id: 'f0ec78c45e4656043d987e9cc03a2784', category: 'workflow', title: 'can install a missing package'},
        {id: 'eac3657da853c06970299108a31ff4d7', category: 'workflow', title: 'When I often run several commands in the same way, I am comfortable with automating the process (e.g. using a scripting language)'},
        {id: '5cd18cdecd4744132d93660c077a3dab', category: 'workflow', title: 'When I often run a complicated command with many options, I am comfortable with wrapping it in a simpler script'},
        {id: '64d4e1957e0212963ffaa6ce19d1e05e', category: 'workflow', title: 'When I occasionally run a complicated command with many options, I can easily find the exact command I ran the previous time (e.g. from notes or from terminal history)'},
        {id: '1d8fddf24fe37b7e92b24800ec72dc74', category: 'workflow', title: 'Can manage file ownership and permissions'},
      ],
      questionIndex: null
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state.questionIndex = Math.floor(Math.random() * this.state.questions.length);
  }

  render() {
    const options = [
      {id: '1', title: "I did not know this was something important"},
      {id: '2', title: "I did not know this was possible"},
      {id: '3', title: "I need help doing this"},
      {id: '4', title: "I do this often"},
      {id: '5', title: "I do this often and can teach others"},
      {id: '6', title: "I think this is undesirable"}
    ];


    return (
        <div className="App">
          <header className="App-header">
            Developer skill conversation starter
            <p>refresh for a new question!</p>
            <p className="App-text">{this.state.questions[this.state.questionIndex].category}: {this.state.questions[this.state.questionIndex].title}</p>
            <form onSubmit={this.handleFormSubmit}>
              {
                options.map((option, i) => {
                  return (
                      <div className="radio" key={i}>
                      <label>
                      <input type="radio" value={options[i].id} checked={this.state.selectedOption === options[i].id} onChange={this.handleOptionChange.bind(this)} />{options[i].title}
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
    console.log("option changed to:", changeEvent.target.value);
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
