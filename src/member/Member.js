import { Button, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { DataGrid } from "@material-ui/data-grid";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useState } from "react";
import { connect } from "react-redux";
import Events from "../events/Events";
import { deleteMember } from "../redux/ActionTypes";

function createData(id, name, age, phone, email, company) {
  return { id, name, age, phone, email, company };
}

function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

const columns = [
  { field: "id", headerName: "ID", width: 100, sortable: false },
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 130 },
  { field: "phone", headerName: "phone", width: 130, sortable: false },
  { field: "email", headerName: "Email", width: 130, sortable: false }
];

function Member(props) {
  const rows = [];

  props.members.map(element => {
    rows.push(
      createData(
        element.id,
        element.name,
        element.age,
        element.phone,
        element.email,
        element.company
      )
    );
  });
  const [sortConfig, setSortConfig] = useState(null);
  const [selection, setSelection] = useState([]);
  const [filterValue, setFilterValue] = useState();

  if (sortConfig !== null) {
    rows.sort(compareValues(sortConfig.key, sortConfig.direction));
  }

  const requestSort = key => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const deleteMember = idx => {
    rows.splice(idx, 1);
    props.deleteMember(rows);
  };

  const deleteMembers = () => {
    for (var i = selection.length -1; i >= 0; i--)
    rows.splice(selection[i-1],1);
    props.deleteMember(rows);
  };

  const onFilterChange = React.useCallback((params) => {
      setTimeout(()=> console.log(params.api.state.visibleRows.visibleRows));
    setFilterValue(params.filterModel.items[0].value);
    
  }, []);
  
  return (
    <div>
      <h1>Members</h1>
      {selection.length > 0 ? (
        <Button dir="rtl"  variant="contained" color="secondary" onClick={() => deleteMembers()}>Delete</Button>
      ) : null}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionChange={newSelection => {
            setSelection(newSelection.rowIds);
          }}
          
          onFilterModelChange={onFilterChange}
        />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton
                  color="secondary"
                  aria-label="add an alarm"
                  onClick={() => requestSort("name")}
                >
                  {" "}
                  {sortConfig &&
                  sortConfig.key === "name" &&
                  sortConfig.direction === "asc" ? (
                    <ArrowDownwardIcon color="primary" fontSize="small" />
                  ) : (
                    <ArrowUpwardIcon color="primary" fontSize="small" />
                  )}
                </IconButton>
                Name
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="secondary"
                  aria-label="add an alarm"
                  onClick={() => requestSort("age")}
                >
                  {" "}
                  {sortConfig &&
                  sortConfig.key === "age" &&
                  sortConfig.direction === "asc" ? (
                    <ArrowDownwardIcon color="primary" fontSize="small" />
                  ) : (
                    <ArrowUpwardIcon color="primary" fontSize="small" />
                  )}
                </IconButton>
                Age
              </TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.company}</TableCell>
                <TableCell align="right">
                  <button onClick={() => deleteMember(idx)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Events />
    </div>
    
  );
}

const mapStateToProps = state => {
  return {
    members: state.membersReducer.members
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMember: data => dispatch(deleteMember(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
