import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
// helpers
import * as G from '../../../global/helpers';
// ui
import DateComponent from './calendar';
import {
  Text,
  Label,
  Input,
  FlexBox,
  Checkbox } from '../../../ui';
//////////////////////////////////////////////////////////////////////////

const DayWrap = (props) => {
  const [checked, setChecked] = useState(false);
  const [workingHoursToValue, setWorkingHoursToValue] = useState(null);
  const [workingHoursFromValue, setWorkingHoursFromValue] = useState(null);
  const handleCheckboxChange = (event) => {
    const { values } = props;
    setChecked(event.target.checked);
    if (R.has(props.item.fieldName), !event.target.checked) {
      // const omitedFields= [
      //   props.item.fieldName,
      //   `${props.item.fieldName}WorkingHoursFrom`,
      //   `${props.item.fieldName}WorkingHoursTo`,
      // ]
      const newFields = {
        [props.item.fieldName]: event.target.checked,
        [`${props.item.fieldName}WorkingHoursFrom`]: 'z',
        [`${props.item.fieldName}WorkingHoursTo`]: 'z',
      };
      const newValues = R.merge(R.path(['venueSchedule'], values), newFields);
      props.setValues(R.set(R.lensProp('venueSchedule'), newValues, values));
      // props.setValues(
      //   R.set(
      //     R.lensProp('venueSchedule'),
      //     R.omit(omitedFields, R.path(['venueSchedule'], values)),
      //     values
      //   )
      // );
    } else {
      const newFields = {
        [props.item.fieldName]: event.target.checked,
        [`${props.item.fieldName}WorkingHoursFrom`]: workingHoursFromValue,
        [`${props.item.fieldName}WorkingHoursTo`]: workingHoursToValue,
      };
      const newValues = R.merge(R.path(['venueSchedule'], values), newFields);
      props.setValues(R.set(R.lensProp('venueSchedule'), newValues, values));
    }
  }

  const handleChange = (
    event,
    name,
    // date
    ) => {
    const { values } = props;
    const timeStamp = Math.round((R.path(['timeStamp'], event)));
    const time = R.path(['nativeEvent', 'target', 'value'], event);
    const setName =R.equals('from',name) ? `${props.item.fieldName}WorkingHoursFrom` : `${props.item.fieldName}WorkingHoursTo`;
    const setTimeValue =R.equals('from',name) ? setWorkingHoursFromValue : setWorkingHoursToValue;
    setTimeValue(time);
    const newVenueSchedule = R.set(R.lensProp(setName), timeStamp, R.path(['venueSchedule'], values));
    props.setValues(R.set(R.lensProp('venueSchedule'), newVenueSchedule, values));
    // const newDate = {
    //   [`${props.item.fieldName}WorkingHoursFrom`]: date.startTime,
    //   [`${props.item.fieldName}WorkingHoursTo`]: date.endTime
    // }
    // const newVenueSchedule = R.merge(R.path(['values', 'venueSchedule'], props), newDate);
    // props.setValues(R.set(R.lensProp('venueSchedule'), newVenueSchedule, props.values));
  }
  useEffect(
    () => {
      const schedule = R.path(['values', 'venueSchedule'], props);
      if (G.isTrue(schedule[props.item.fieldName])) {
        setChecked(schedule[props.item.fieldName]);
        setWorkingHoursFromValue(R.or(
          workingHoursFromValue,
          G.splitTime(G.convertTime(schedule[`${props.item.fieldName}WorkingHoursFrom`])))
        );
        setWorkingHoursToValue(R.or(
          workingHoursToValue,
          G.splitTime(G.convertTime(schedule[`${props.item.fieldName}WorkingHoursTo`])))
        );
        return;
      }
  }, [props.values])
  return (
    <FlexBox
      key={props.index}
      flexDirection='column'
      alignItems='flex-start'
      justifyContent='center'
    >
      <Label
        py='10px'
        pl='45px'
        width='200px'
        color='#4A4B59'
        fontSize='18px'
        key={props.index}
        fontWeight='bold'
        position='relative'
        alignItems='center'
        height='max-content'
        justifyContent='flex-start'
      >
        <Checkbox
          left='0'
          checked={checked}
          type={props.item.type}
          name={props.item.fieldName}
          onChange={(e) => handleCheckboxChange(e)}
        />
        {props.item.label}
      </Label>
      {
        R.and(
        checked,
        <FlexBox
          mt='15px'
          ml='25px'
          alignItems='center'
        >
          <Text
            mr='20px'
            width='200px'
            fonSize='16px'
            color='#4A4B59'
            textAlign='left'
          >
            Opening Hours
          </Text>
          {/* <DateComponent
            {...props}
            type='timeRange'
            customHandler={handleChange}
            nameInputEnd={`${props.item.fieldName}WorkingHoursTo`}
            nameInputStart={`${props.item.fieldName}WorkingHoursFrom`}
          />  */}
          <Input
            m='5px 10px'
            type='time'
            width='45%'
            height='100%'
            cursor='pointer'
            borderRadius='10px'
            value={workingHoursFromValue} 
            onChange={(e) => handleChange(e, 'from')}
            name={`${props.item.fieldName}WorkingHoursFrom`}
          />
            -
          <Input
            type='time'
            width='45%'
            m='5px 10px's
            height='100%'
            cursor='pointer'
            borderRadius='10px'
            value={workingHoursToValue}
            onChange={(e) => handleChange(e, 'to')}
            name={`${props.item.fieldName}WorkingHoursTo`}
          />
        </FlexBox>
      )
    }
  </FlexBox>
)};

export const ScheduleComponent = (props) => (
  <FlexBox
    my='15px'
    alignSelf='flex-start'
    flexDirection='column'
    justifyContent='flex-start'
    width={R.or(props.width, '100%')}
  >
    <Text
      mb='20px'
      fonSize='18px'
      color='#4A4B59'
      textAlign='left'
      fontWeight='bold'
    >
      Working Hours
    </Text>
    {
      props.fields.map(
        (item, index) => (
          <DayWrap
            {...props}
            key={index}
            item={item}
            index={index} 
          />
        )
    )}
  </FlexBox>
);

export default ScheduleComponent;
