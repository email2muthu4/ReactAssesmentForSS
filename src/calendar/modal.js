import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { connect } from "react-redux";
import { deleteMember } from '../redux/ActionTypes';
import Calendar from './Calendar';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}



function CalenderModal(props) {
  const index  = props.idx;
  console.log(index);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const [schedulerData, setSchedulerData] = useState(null);
  const handleOpen = () => {
    const eventIds = props.members[props.idx].eventId;
    const sData = props.events.filter(data => {
      return eventIds.includes(data.id);
    });
    setSchedulerData(sData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       
      <Calendar schedulerData={schedulerData} /> 
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalenderModal);
