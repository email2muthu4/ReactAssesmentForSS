import { Button } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import React, { useState } from "react";
import { connect } from "react-redux";
import Calendar from "../calendar/Calendar";
import Events from "../events/Events";
import { deleteMember } from "../redux/ActionTypes";

function createData(id, name, age, phone, email, company, eventId) {
  return { id, name, age, phone, email, company, eventId };
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
  { field: "email", headerName: "Email", width: 130, sortable: false },
  { field: "company", headerName: "Company", width: 130, sortable: false },
  {
    field: "eventId",
    headerName: "Events",
    width: 200,
    sortable: false,
    renderCell: params => {
      return (
        <strong>
          <Button
            id={params.value.idx}
            name="active"
            color="primary"
            onClick={() => params.value.call(params.value.idx)}
          >View on Calendar</Button>
        </strong>
      );
    }
  }
];

function Member(props) {
  const rows = [];
  const [schedulerData, setSchedulerData] = useState(null);
  const handleChange = event => {console.log(event)
    const eventIds = props.members[event].eventId;
    const sData = props.events.filter(data => {
      return eventIds.includes(data.id);
    });
    setSchedulerData(sData);
  };
  props.members.map((element, idx) => {
    rows.push(
      createData(
        element.id,
        element.name,
        element.age,
        element.phone,
        element.email,
        element.company,
        {idx:idx,eventIds: element.eventId, call:handleChange}
      )
    );
  });

  const [eveId, seteveId] = useState(null);
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
      setTimeout(()=> {
        const idx = params.api.state.visibleRows.visibleRows;
        if(idx && idx.length) {
          let eveId =[];
          idx.map(id => {
            const mem = rows[id-1];
            eveId = eveId.concat(mem.eventId);
            eveId = [...new Set(eveId)];
          });
          seteveId(eveId);
        } else {
          seteveId(null);
        }
      },0);
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
          columns={columns.map((column) => ({
            ...column,
            disableClickEventBubbling: true,
          }))}
          pageSize={5}
          showToolbar
          components={{
            Toolbar: GridToolbar,
          }}
          disableClickEventBubbling
          checkboxSelection
          onSelectionChange={newSelection => {
            setSelection(newSelection.rowIds);
          }}
          
          onFilterModelChange={onFilterChange}
        />
      </div>
      {/* <TableContainer component={Paper}>
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
      </TableContainer> */}
      <Events eveId={eveId}/>
      <h2> Calendar</h2>
      <Calendar schedulerData={schedulerData}/>
    </div>
    
  );
}

const mapStateToProps = state => {
  return {
    members: state.membersReducer.members,
    events: state.eventReducer.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMember: data => dispatch(deleteMember(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
