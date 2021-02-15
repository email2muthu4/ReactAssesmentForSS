import { Switch } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
import { connect } from "react-redux";
import { updateEvent } from "../redux/ActionTypes";

function createData(id, organiser, capacity, capacityStatus, active) {
  return { id, organiser, capacity, capacityStatus, active };
}


const columns = [
  { field: "id", headerName: "ID", width: 100, sortable: false },
  { field: "organiser", headerName: "Organiser", width: 200, sortable: false },
  { field: "capacity", headerName: "Capacity", width: 250, sortable: false },
  { field: "capacityStatus", headerName: "Capacity Status", width: 200, sortable: false },
  { field: "active", headerName: "Active", width: 200, sortable: false,
  renderCell: (params) => {
   return <strong>
      <Switch
        id = {params.value.idx}
        name="active"
        color="primary"
        onChange={params.value.call}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </strong>
  }, }
];

function Events(props) {

  const [filterValue, setFilterValue] = useState();
  const rows = [];
  const handleChange = (event) => {
    rows[event.target.id].active = event.target.checked;
    props.updateEvent(rows);
  };
  props.event.map((element, idx) => {
    rows.push(createData(element.id, element.organiser, element.capacity, element.capacityStatus, {checked:element.active,call:handleChange, idx:idx.toString() }));
  });

 

  const onFilterChange = React.useCallback(params => {
    setFilterValue(params.filterModel.items[0].value);
  }, []);

  return (
    <div>
        <h1>Events</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          onFilterModelChange={onFilterChange}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    event: state.eventReducer.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEvent: data => dispatch(updateEvent(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
