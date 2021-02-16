import { ViewState } from '@devexpress/dx-react-scheduler';
import { Appointments, AppointmentTooltip, DateNavigator, MonthView, Scheduler, Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';

const currentDate = new Date();


function Calendar(props) {
  const schedulerData =props.schedulerData?  props.schedulerData : [
    
  ];
 return (
  <Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        defaultCurrentDate={currentDate}
      />
      <MonthView
      />
      <Toolbar />
      <DateNavigator />
      <Appointments />
      <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
    </Scheduler>
  </Paper>
);
}

export default Calendar;