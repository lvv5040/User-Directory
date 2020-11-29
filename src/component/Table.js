import React from "react";
import axios from "axios";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: [],
      order: "negative",
    };
  }

  async componentDidMount() {
    //get the necessary data for table
    const tableData = await axios
      .get("https://randomuser.me/api/?results=200&nat=us")
      .then((res) => {
        return res.data.results;
      });
    console.log("tableData: ", tableData);
    //set employeedata
    this.setState({ employeeData: tableData });
  }

  changeHandler = async (event) => {
    const tableData = await axios
      .get("https://randomuser.me/api/?results=200&nat=us")
      .then((res) => {
        return res.data.results;
      });
    const userInput = event.target.value;
    const employeeListFiltered = tableData.filter(
      (employee) =>
        employee.name.first.indexOf(userInput) > -1 ||
        employee.name.last.indexOf(userInput) > -1
    );
    this.setState({
      employeeData: employeeListFiltered,
    });
  };

  reorderEmployee = () => {
    let sortedData;
    //sort list
    switch (this.state.order) {
      case "negative":
        sortedData = this.state.employeeData.sort((a, b) =>
          a.name.first > b.name.first ? 1 : -1
        );
        this.setState({
          employeeData: sortedData,
          order: "positive",
        });
        break;
      case "positive":
        sortedData = this.state.employeeData.sort((a, b) =>
          a.name.first > b.name.first ? -1 : 1
        );
        this.setState({
          employeeData: sortedData,
          order: "negative",
        });
        break;
      default:
        break;
    }
  };

  render() {
    //define table data elements
    let tableDetails = null;
    //if value is initialized
    if (this.state.employeeData !== []) {
      tableDetails = this.state.employeeData.map((employee) => {
        return (
          <tr key={employee.login.uuid}>
            <td className="employee-image">
              <img src={employee.picture.medium} />
            </td>
            <td className="employee-name">
              <span>{employee.name.first}</span>
              <span>{employee.name.last}</span>
            </td>
            <td className="employee-phone">
              <div>{employee.phone}</div>
            </td>
            <td className="employee-email">
              <div>{employee.email}</div>
            </td>
            <td className="employee-dob">
              <div>{employee.dob.date.slice(0, 10)}</div>
            </td>
          </tr>
        );
      });
    }

    return (
      <div className="table">
        <div className="search-bar">
          <input type="search" onChange={this.changeHandler} />
        </div>
        <table>
          <thead>
            <tr>
              <th className="table-col-image">Image</th>
              <th className="table-col-name" onClick={this.reorderEmployee}>Name</th>
              <th className="table-col-phone">Phone</th>
              <th className="table-col-email">Email</th>
              <th className="table-col-dob">DOB</th>
            </tr>
          </thead>
          <tbody>{tableDetails}</tbody>
        </table>
      </div>
    );
  }
}
