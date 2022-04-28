import React from 'react'
import Info from './Info'
import Form from './Form'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newName: '',
      newNum: ''
    }
    console.log('constructored');
  }
  componentDidMount() {
    console.log('mounted');
    axios
      .get(`http://localhost:3001/api/persons`)
      .then(response => {
        console.log('resolved');
        this.setState({ persons: response.data})
      })
  }
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumChange = (event) => {
    this.setState({ newNum: event.target.value })
  }
  addName = (event) => {
    event.preventDefault()
    const nameNumber = {name: this.state.newName, number: this.state.newNum}
    let checkName = this.state.persons.find(e => e.name === nameNumber.name)
    let checkNumber = this.state.persons.find(e => e.number === nameNumber.number)
    if ((checkName !== undefined || checkNumber !== undefined) || (checkName !== undefined && checkNumber !== undefined)) {
        alert('Name or number match');
        this.setState({
          persons: this.state.persons,
          newName: '',
          newNum: ''
        })
    } else{
      axios
        .post(`http://localhost:3001/api/persons`, nameNumber)
        .then(res => res.data)
        .then(res => {
          this.setState({
            persons: this.state.persons.concat(res),
            newName: '',
            newNum: ''
          })
        })
    }
  }
  deleteInfo = (idd) => {
       console.log(idd);
       (window.confirm("Do you really want to delete?")) 
        axios
        .delete(`http://localhost:3001/api/persons/${idd}`)
        .then(()=> {
          this.setState({
            persons: this.state.persons.filter(e => e.id !== idd)
          })
        })
  }
  render() {
    console.log('rendered');
    return (
      <div>
        <h2>Telephone Directory</h2>
        <Form newName={this.state.newName} newNum={this.state.newNum} addName={this.addName}
          handleNameChange={this.handleNameChange} handleNumChange={this.handleNumChange}/>
        <h2>Name and Numbers</h2>
        <div>
          {this.state.persons.map(e => 
            <Info key={e.id} id= {e.id} name={e.name} number={e.number} handleDelete={this.deleteInfo} />)}
        </div>
      </div>
    )
  }
}
export default App;