import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getQuestionText = this.getQuestionText.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);

    this.state = {
      selectedOption: null,
      options: [
          {id: "1", title: "I did not know this was something important"},
          {id: "2", title: "I did not know this was possible"},
          {id: "3", title: "I need help doing this"},
          {id: "4", title: "I do this often"},
          {id: "5", title: "I do this often and can teach others"},
          {id: "6", title: "I think this is undesirable"}
      ],
      questions: JSON.parse(localStorage.getItem('dscs-questions')) ?? [
        {id: "668e532a2324084e9a35f999442b1ddd", category: "workflow", title: "I can swap between open files in multiple repositories without having to close down a terminal or editor"},
        {id: "9d64a15c8a1ec1a6425a0399771e5a62", category: "workflow", title: "I can search for text in a configuration file anywhere on my computer from the command line, without knowing the name of the file"},
        {id: "feb6c5c7a9dd209caf36d0594357eccb", category: "workflow", title: "I can search for a line of code in a specific project or directory"},
        {id: "22f4c7047c225466df319ede462dfadc", category: "workflow", title: "I can output the contents of a file to the terminal without opening up a an editor"},
        {id: "eec24620e5845fef4df68ff0b6d83070", category: "workflow", title: "I can easily perform find and replace across multiple files in a project"},
        {id: "ac2e346811f20e02031ebf65228fd0de", category: "workflow", title: "I can edit, remove or rename files from a terminal"},
        {id: "f0ec78c45e4656043d987e9cc03a2784", category: "workflow", title: "I can install a missing package"},
        {id: "eac3657da853c06970299108a31ff4d7", category: "workflow", title: "When I often run several commands in the same way, I am comfortable with automating the process (e.g. in a bash script)"},
        {id: "cd18cdecd4744132d93660c077a3dab", category: "workflow", title: "When I often run a complicated command with many options, I am comfortable with wrapping it in a simpler script"},
        {id: "64d4e1957e0212963ffaa6ce19d1e05e", category: "workflow", title: "When I occasionally run a complicated command with many options, I can easily find the exact command I ran the previous time (e.g. from notes or from terminal history)"},
        {id: "d8fddf24fe37b7e92b24800ec72dc74", category: "workflow", title: "I can manage file ownership and permissions"},
        {id: "8300a316ed6d7e63beccd26c1c9dbe35", category: "workflow", title: "I can revert a branch or file to a previous state (reset, revert, checkout)"},
        {id: "41b90e41cd34802650113be3c4c6c59", category: "workflow", title: "I can incorporate changes from another branch (merge, rebase)"},
        {id: "40e39220092e2c7fb61d897c3f7e533", category: "workflow", title: "I can write clear commit messages describing the reason for changes and any notable features of the implementation"},
        {id: "eee41305226fee4cf1d502ce1ad615db", category: "workflow", title: "I can manipulate commits (amend) and history (rebase) to present a tidy and coherent set of changes"},
        {id: "607c1ad5c29929fb30e61c79de63ad45", category: "debugging", title: "I can compare output from multiple running processes without closing one down before starting another"},
        {id: "e1625ab3da07ca6683e6b0e8a373a10b", category: "debugging", title: "I know how to step through Ruby code with a debugger"},
        {id: "2bc0ba4393fe450f528da9160f4685e3", category: "debugging", title: "I can test if a port is in use on my computer"},
        {id: "2b540b59de9c73baf7e8e1692558f613", category: "debugging", title: "I can verify if an http API is running, independently of the code that calls it"},
        {id: "28b24339b679614bc2bad40f86872ca3", category: "debugging", title: "I can verify that a process is running on my computer from the command line"},
        {id: "88dea09c5666575cebe734f05995b239", category: "debugging", title: "I can verify whether a process is running on a particular port of a computer"},
        {id: "1e894cbb691df789c9154d7b4ceb0bb7", category: "debugging", title: "I can find the executable file for a given terminal command"},
        {id: "9a1fe28ebb6887d4e444e2a3ab18ab57", category: "debugging", title: "I can add logging to find more information about the internal workings of a piece of code"},
        {id: "af53594a8e47322fbed15af7df7e2d4b", category: "debugging", title: "I can list docker containers running on a computer"},
        {id: "8ca30eb608ec4e0a8c4aed9224d341b1", category: "debugging", title: "When a bash script does not do what I expect, I am comfortable reviewing the script and running the individual parts to diagnose the problem"},
        {id: "5aa8d3ab329d9c1cae7ee1238969ae5e", category: "debugging", title: "I am comfortable reviewing CI failure output and can identify the command I need to reproduce a problem locally"},
        {id: "7d795243b23f590137e0d35f4a7ffa6c", category: "debugging", title: "I can easily identify and update what environment variables are in effect: (a) on the command line (b) inside a repl (c) in a hosted environment, e.g. staging, production"},
        {id: "42af7f4f82d61fa31df7f0f8a55bed68", category: "debugging", title: "When I am investigating a bug I can prioritise my investigative actions by reasoning about which points of failure are most or least likely"},
        {id: "724642da7320db726fcc8e4ab86f6577", category: "rails", title: "I can check the value of a path helper in a rails console"},
        {id: "11aae1b6ca6143676ed8b4e845779ecf", category: "rails", title: "I can verify small pieces of Rails code perform as expected in the rails console"},
        {id: "102bc2134a9b82710c5bbf7f8d38b136", category: "rails", title: "I can identify what SQL query a Rails application is running given code plus (logs or rails console)"},
        {id: "481bdc8ce6542dbf375aba9ef1a6548", category: "rails", title: "I can run a SQL query in a database client outside of Rails"},
        {id: "a3fe648f8a0b40d36ab6733139d3b515", category: "rails", title: "I can read an error message in a bundle install and identify if there is a missing dependency"},
        {id: "f71389b719fdd87361ee22193c9c2219", category: "rails", title: "I can identify if a Rails application is communicating with an external system"},
        {id: "e6c0afa9af8c4a8f92ff30e5b35713e9", category: "rails", title: "I can identify when a piece of Ruby code is calling a gem"},
        {id: "d130a4252bd0327969b1afb718266ffd", category: "rails", title: "I can identify from application code whether a gem was written in-house or is third-party"},
        {id: "db8bc0590beb3a30d57fc69529b33b0e", category: "rails", title: "I can find the source of a third-party gem"},
        {id: "d48a3a7365f69995ec2ca9f6707416b4", category: "rails", title: "I can write a Rails initializer"},
        {id: "ebe0e5c2d5b623e9305faad5945b46ee", category: "rails", title: "I can use browser dev tools to identify whether there are JS errors on a page"},
        {id: "2f4ea7eb209fae1896a10fc2ebbe6702", category: "rails", title: "I can quickly look up the documentation for a Ruby class or method in the standard library"},
        {id: "5de0a5c588773117dea0c214b241e02c", category: "rails", title: "I can list the methods on a Ruby object"},
        {id: "875bf4e734fa5636e9a4c0936fb1b18e", category: "rails", title: "I can find the source of a Ruby method in application or third-party code"},
        {id: "e0d1397c948c8416970c85c119ee9b69", category: "rails", title: "I can identify the class and inheritance hierarchy of a Ruby object using standard library methods"},
        {id: "5823d9a2c1b9462711649d644a43f392", category: "rails", title: "I can design a RESTful routing scheme"},
        {id: "807d04604314a8d0e621e8c56302d6d7", category: "rails", title: "I can decide whether the best test of a change is a unit test of a small piece of code, or a test of integration between multiple collaborators"},
        {id: "07873e4c6594b104a6fb3b114fe3ce68", category: "rails", title: "I can identify when a piece of code does not fit well into a Rails model, view, or controller, and implement it as a new class"},
        {id: "5983b07b2c641069d4810b9418f47106", category: "process", title: "I can identify whether a requirement is urgent or not"},
        {id: "06915a819c365afae42cb0cdb3936403", category: "process", title: "I can communicate that a requirement is not an immediate priority"},
        {id: "26087311ac01e4e19435e35632377531", category: "process", title: "I can identify when there is more to a story than the writer realised"},
        {id: "5a73bfe97d688e3f2f2b6f878d6b4d81", category: "process", title: "When I realise I do not understand something about a feature, I am comfortable talking to someone outside the team about it"},
        {id: "366bb5eecf47c82b234ecbd2c03bd821", category: "process", title: "I am comfortable communicating an assumption to avoid a blocker and proceeding with it until someone tells me otherwise"},
        {id: "2deb917c389a50a9228a945c4a0a8dc0", category: "process", title: "I can push part of my work in progress for review if it is helpful to get other perspectives"},
        {id: "bf540415c2a304790e79e82e5e4a6a9d", category: "process", title: "I can ship part of my work in progress if it will add business value or help get better feedback fast "},
        {id: "71fb72c514489e3c1e8d5a8d8503a01", category: "process", title: "I can identify pieces of a feature that could be hardcoded in order to ship and receive feedback faster"},
        {id: "86adeeb984af649e98a85f1b051bef73", category: "process", title: "I am comfortable joining a pairing session and contributing what I can, even if I am lacking previous context"},
        {id: "0d4d686b02d645aef1fe8cb98b2f3649", category: "process", title: "I am comfortable completing a PR that I did not start based on CI feedback"},
        {id: "792e01bcec671da2df89baaa067f6c2d", category: "process", title: "I am comfortable doing what I can (pairing/reviewing/coding/manual testing/deploying) to help complete in-progress items started by someone else rather than starting a new feature"},
        {id: "691984f92487223fc98a0d42e958a275", category: "process", title: "I am comfortable working with feature flags"},
        {id: "fa724c4127ad1361eabb990b5eb9b872", category: "process", title: "I am comfortable learning how a client team debugs their production applications and ensuring that their standard tooling is available for me"},
        {id: "51b9aee77e3df8cc8128207ed2ea88d9", category: "process", title: "I am comfortable using a client's approach to deployment given an introduction from another developer"},
        {id: "bd7cabb9da8e9aa710d08ea05a86971", category: "process", title: "I expect to see code running in an environment other than my own machine (e.g. test/staging/production) before I consider it 'done'"},
        {id: "b54c8be9215648874cd9a1ccc428687", category: "process", title: "I know how to verify that my changes work in a test/staging/production environment, even if there is no customer facing element"},
        {id: "3c6250434ce72335c17fa04f6ccf8f02", category: "architecture", title: "I can draw a diagram to describe the interactions between pieces of a distributed architecture (services, data stores, APIs, etc)"},
        {id: "4b6124f7354d4eadd42f5ec6171d961", category: "architecture", title: "I can draw a diagram to describe the interactions between pieces of code (e.g. objects, functions) to help myself and others understand and make decisions"},
      ],
      questionIndex: null,
      answers: JSON.parse(localStorage.getItem('dscs-answers')) ?? [],
    };
    this.state.questionIndex = Math.floor(Math.random() * this.state.questions.length);
  }

  render() {


    return (
        <div className="App">
          <header className="App-header">
            Developer skill conversation starter
          </header>
          <div className="App-content">
            <p>{this.state.questions[this.state.questionIndex].category}: {this.state.questions[this.state.questionIndex].title}</p>
            <form onSubmit={this.handleFormSubmit}>
            {
              this.state.options.map((option, i) => {
                return (
                    <div className="radio" key={i}>
                    <label>
                    <input type="radio" value={this.state.options[i].id} checked={this.state.selectedOption === this.state.options[i].id} onChange={this.handleOptionChange.bind(this)} />{this.state.options[i].title}
                  </label>
                    </div>
                )
              })
            }
            <button className="btn btn-default" type="submit" onSubmit={this.handleFormSubmit}>Next question</button>
            </form>
            <p>Previous answers:</p>
            <ul>
            {
              this.state.answers.map((answer, index) => {
                return (<li key={index}>{answer.question.title}: {answer.answer.title}</li>)
              })
            }
            </ul>
          </div>
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

    this.setState(previousState => (
      {
        questions: previousState.questions.filter(q => q.id !== previousState.questions[previousState.questionIndex].id),
        answers: [
          ...previousState.answers,
          {
            question: previousState.questions[previousState.questionIndex],
            answer: previousState.options[previousState.selectedOption]
          }
        ],
        selectedOption: null,
        questionIndex: Math.floor(Math.random() * previousState.questions.length - 1)
      }
    ), this.saveToLocalStorage);
  }

  getQuestionText(questionId) {
    return this.state.questions.filter((question) => question.id === questionId)[0].id;
  }

  saveToLocalStorage() {
    localStorage.setItem('dscs-questions', JSON.stringify(this.state.questions));
    localStorage.setItem('dscs-answers', JSON.stringify(this.state.answers));
  }
}

export default App;
