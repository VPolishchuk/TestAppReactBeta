import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
// helpers
import * as G from '../../../global/helpers';
//ui
import { FlexBox } from '../../index';
import { DatePicker, CalendarFormGroup } from './date-picker';
import 'react-datepicker/dist/react-datepicker.css';
// ///////////////////////////////////////////////////////////////////////////////////////////////////

export const  DatePickerComponent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    if (G.isNotNilAndNotEmpty(props.customHandler)) {
      props.customHandler(G.createUnixTimeFormat(startDate))
      return;
    };
  }, [startDate])
  return (
    <FlexBox
    width={R.or(props.width, '100%')}
    justifyContent={R.or(props.justifyContent, 'space-around')}
    >
      <DatePicker
        selected={startDate}
        showPopperArrow={false}
        inline={R.or(props.inline, false)}
        onChange={date => setStartDate(date)}
      />
    </FlexBox>
  );
}

export const TimePickerComponent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption='Time'
      dateFormat='h:mm aa'
    />
  );
}

export const TimeRangePickerComponent = (props) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const handleChange = (date, name) => {
    if (R.equals(name, 'start')) {
      setStartTime(date);
    }
    if (R.equals(name, 'end')) {
      setEndTime(date)
    }
  }
  useEffect(() => {
    if (G.isNotNilAndNotEmpty(props.customHandler)) {
      props.customHandler({
        'startTime': G.createUnixTimeFormat(startTime),
        'endTime': G.createUnixTimeFormat(endTime),
      })
      return;
    };
    // if (G.isNotNilAndNotEmpty(R.path(['values', 'venueSchedule'], props))) {
    //   setStartTime(
    //     // G.splitTime(
    //       G.convertTime(
    //     R.path(['values', 'venueSchedule', props.nameInputStart], props)
    //     )
    //     // )
    //   );
    //   setEndTime(
    //     // G.splitTime(
    //       G.convertTime(
    //     R.path(['values', 'venueSchedule', props.nameInputEnd], props)
    //     )
    //     // )
    //   )

    // }
  }, [
    endTime,
    startTime,
    // props.values
  ])
  console.log('startTime', startTime)
  console.log('endTime', endTime)
  console.log('TimeRangePickerComponent', props)
  return (
    <FlexBox
      width={R.or(props.width, '100%')}
      alignItems={R.or(props.alignItems, 'center')}
      justifyContent={R.or(props.justifyContent, 'space-around')}
    >
      <DatePicker
        selected={startTime}
        name={props.nameInputStart}
        onChange={date => handleChange(date, 'start')}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption='Time'
        dateFormat='hh:mm aa'
      />
      -
      <DatePicker
        selected={endTime}
        name={props.nameInputEnd}
        onChange={date => handleChange(date, 'end')}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption='Time'
        dateFormat='h:mm aa'
      />
    </FlexBox>
  );
}


export const DateRangeComponent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleChange = (date, name) => {
    if (R.equals(name, 'start')) {
      setStartDate(date);
    }
    if (R.equals(name, 'end')) {
      setEndDate(date)
    }
  }

  useEffect(() => {
    if (G.isNotNilAndNotEmpty(props.customHandler)) {
      props.customHandler({
        'startDate': startDate,
        'endDate': endDate,
      })
      return;
    };
  }, [startDate, endDate])
  return (
    <CalendarFormGroup
      flexDirection='row'
      width={R.or(props.width, '100%')}
      justifyContent={R.or(props.justifyContent, 'space-around')}
    >
      <DatePicker
        selected={startDate}
        onChange={date => handleChange(date, 'start')}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={date => handleChange(date, 'end')}
        selectsEnd
        endDate={endDate}
        minDate={startDate}
      />
    </CalendarFormGroup>
  )
};

export const DateComponent = (props) => {
  if (R.equals(props.type, 'time')) {
    return <TimePickerComponent {...props}/>
  }
  if (R.equals(props.type, 'timeRange')) {
    return <TimeRangePickerComponent {...props} />
  }
  if (R.equals(props.type, 'calendar')) {
    return <DatePickerComponent {...props} />
  }
  return <DateRangeComponent {...props} />
};

export default DateComponent;
