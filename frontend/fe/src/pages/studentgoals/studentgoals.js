import axios from "axios";
import React from "react"
import { Table } from "react-bootstrap";
import {useParams} from "react-router-dom";
import Goal from "../../components/goal";

export default function StudentGoals (props) {
    const {studentId} = useParams()
    return <StudentGoalsRetrieved studentId={studentId}/>
}

class StudentGoalsRetrieved extends React.Component {
  state = {
      goals : []
  };

  componentDidMount() {

      let data;
      var apiUrl = `http://127.0.0.1:8000/api/students/${this.props.studentId}/goals/`

      axios.get(apiUrl, { headers: { 
          'credentials': 'true',
          'Authorization': 'Token ' + localStorage.getItem('token'), // get rid of this once we have a token
          'Access-Control-Allow-Headers': '*'}})
      .then(res => {
          data = res.data;
          console.log(data)
          this.setState({
              goals : data
          });
      })
      .catch(err => {})
  }
  

  render() {
      return (
        <div>
          <h1>Their goals</h1>
          <Table striped bordered hover>
            <tbody>
              {this.state.goals.map(goal => (
                  <Goal title={goal.title} description={goal.description}/>
                ))}
            </tbody>
          </Table>
        </div>
      );
  }
}
