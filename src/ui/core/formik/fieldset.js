import React from 'react';
import * as R from 'ramda';
import { pure } from 'recompose';
// global
import * as H from '../../../global/helpers';
// ui
import {
  Box,
  Info,
  Error,
  FlexBox,
  Textarea,
  SelectWrapper,
  renderOptions } from '../../index';
// components formiks
import { Toggle } from './toggle';
// import Calendar from './calendar';
import SelectInput from './select';
import { UploadFilesBox } from './fileBox';
import ImageInputBox from './image-input-box';
import ScheduleComponent from './schedule-inputs';
import CountryDropdownSelect from './country-dropdown';
import PlacesAutocompleteInput from './places-autocomplete';
import {
  Input,
  Label,
  Fieldset,
  FieldsGroup,
  InputSelect,
  InputsWrapper,
  ReactSelectWrapper } from './ui';
// /////////////////////////////////////////////////////////////////////////////////////////////////

// REFACTOR: sync with route inner formiks
export const setOptions = (
  options,
  optionsForSelect,
  setOptionsFunction,
  field,
) => {
  if (R.and(H.isNotNilAndNotEmpty(setOptionsFunction), H.isTrue(field.shouldSetOptions))) {
    return setOptionsFunction(field);
  }
  if (R.is(String, options)) {
    return R.pathOr([], [options], optionsForSelect);
  }
  return H.ifElse(
    R.is(Array, options),
    options,
    [],
  );
};

// REFACTOR, with less complexity
export const FieldComponent = (props) => {
  if (R.equals(props.type, 'multiselect')) {
    return (
      <ReactSelectWrapper width={props.width} zIndex={R.or(props.zIndex, '12')}>
        <SelectInput {...props} isMulti={true} />
      </ReactSelectWrapper>
    );
  }
  if (R.equals(props.type, 'searchselect')) {
    return (
      <ReactSelectWrapper width={props.width}>
        <SelectInput isMulti={false} {...props} />
      </ReactSelectWrapper>
    );
  }
  if (R.equals(props.type, 'toggle')) {
    return (
      <FlexBox
        width={props.width}
      >
        <Toggle
          {...props}
          icons={false}
          checked={H.ifElse(
            H.isNotNilAndNotEmpty(props.checked),
            props.checked,
            props.value,
          )} />
      </FlexBox>
    );
  }
  if (R.equals(props.type, 'file')) {
    
    return <UploadFilesBox {...props} />;
  }
  // if (R.equals(props.type, 'calendar')) {
  //   return <Calendar {...props} />;
  // }
  if (R.equals(props.type, 'select')) {
    return (
      <ReactSelectWrapper width={props.width} zIndex={R.or(props.zIndex, '12')}>
        <SelectInput {...props} isMulti={false} />
      </ReactSelectWrapper>
    );
  }
  if (R.equals(props.type, 'addressAutocomplete')) {
    return (
      <PlacesAutocompleteInput {...props} width={props.width} />
    );
  }
  if (R.equals(props.type, 'countrySelect')) {
    return (
      <CountryDropdownSelect {...props} />
    );
  }
  if (R.equals(props.type, 'textarea')) {
    return <Textarea {...props} />;
  }
  return <Input {...props} type={props.inputType} width='100%' />;
};

export const setDisabled = (field, values, handlers) => {
  let disabled = field.disabled;
  if (H.isNotNilAndNotEmpty(field.customDisabledFunction)) {
    disabled = handlers[field.customDisabledFunction](values);
  }
  if (R.is(Function, field.disabled)) {
    disabled = field.disabled(field, values);
  }
  return disabled;
};

export const setMulti = (field, values, handlers) => {
  let multi = field.multi;
  if (H.isNotNilAndNotEmpty(field.customMultiType)) {
    multi = handlers[field.customMultiType](values);
  }
  return multi;
};

// REFACTOR: with more safety
export const Inputs = (props) => {
  const {
    values,
    errors,
    touched,
    handlers,
    setValues,
    handleBlur,
    handleEnter,
    handleChange,
    setFieldValue,
    fieldSettings,
    setFieldTouched,
    optionsForSelect,
    setOptionsFunction } = props;
  if (R.equals(fieldSettings.type, 'schedule')) {
    return (
      <ScheduleComponent
        {...props}
        {...fieldSettings}
      />
    )
  }
  {
    if (R.equals(fieldSettings.type, 'image')) {
    return (
      <ImageInputBox
        {...props}
        fields={fieldSettings.fields}
      />
    )
  }}
  if (R.equals(fieldSettings.type, 'multi')) {
    return (
      <InputsWrapper jc='space-between' width='100%'>
        {
          fieldSettings.fields.map((item) => (
            <InputsWrapper jc={fieldSettings.jc} width={item.width}>
              <FieldComponent
                pl='10px'
                pr='10px'
                {...item}
                values={values}
                id={item.fieldName}
                handlers={handlers}
                onBlur={handleBlur}
                key={item.fieldName}
                name={item.fieldName}
                setValues={setValues}
                onChange={handleChange}
                handleEnter={handleEnter}
                setFieldValue={setFieldValue}
                width={R.or(item.width, 'auto')}
                setFieldTouched={setFieldTouched}
                multi={setMulti(item, values, handlers)}
                value={R.path([item.fieldName], values)}
                disabled={setDisabled(item, values, handlers)}
                hasError={R.and(errors[item.fieldName], touched[item.fieldName])}
                options={
                  setOptions(item.options, optionsForSelect, setOptionsFunction, item)
                } />
              {renderError(props.errors, props.touched, item)}
            </InputsWrapper>
          ))
        }
      </InputsWrapper>
    );
  }
  return (
    <FieldComponent
      {...props}
      pl='10px'
      pr='10px'
      values={values}
      {...fieldSettings}
      handlers={handlers}
      onBlur={handleBlur}
      setValues={setValues}
      onChange={handleChange}
      id={fieldSettings.fieldName}
      setFieldValue={setFieldValue}
      name={fieldSettings.fieldName}
      setFieldTouched={setFieldTouched}
      width={R.or(fieldSettings.width, '100%')}
      multi={setMulti(fieldSettings, values, handlers)}
      value={R.path([fieldSettings.fieldName], values)}
      disabled={setDisabled(fieldSettings, values, handlers)}
      hasError={R.and(errors[fieldSettings.fieldName], touched[fieldSettings.fieldName])}
      options={
        setOptions(fieldSettings.options, optionsForSelect, setOptionsFunction, fieldSettings)
      }
    />
  );
};

export const spreadStyles = (item) => (
  H.ifElse(
    R.is(Object, item.styles),
    item.styles,
    {},
  )
);

export const renderError = (errors, touched, item) => (
  H.ifElse(
    R.and(errors[item.fieldName], touched[item.fieldName]),
    <Error
      ml='15px'
      fontSize={11}
      {...spreadStyles(item)}
      errorTop={item.errorTop}
      position={item.position}
      errorLeft={item.errorLeft}
      errorPosition={item.errorPosition}
    >
      {errors[item.fieldName]}
    </Error>,
    null,
  )
);

export const FieldsetComponent = pure((props) => {
  return (
  <Fieldset
    bg={props.bg}
    width={props.width}
    order={props.order}
    height={props.height}
    m={props.fieldsetMargin}
    p={props.fieldsetPadding}
    overflow={props.overflow}
    maxWidth={props.fieldsetMaxWidth}
    borderRadius={props.borderRadius}
    flexDirection={props.flexDirection}
    justifyContent={props.justifyContent}
    backgroundImage={props.backgroundImage}
  >
    {
      R.and(
        H.isNotNilAndNotEmpty(props.title),
        <FlexBox
          bg={props.titleBg}
          m={props.titleMargin}
          color={props.titleColor}
          height={props.titleHeight}
          fontSize={props.titleFontSize}
          alignItems={props.titleAlignItems}
          lineHeight={props.titleLineHeight}
          justifyContent={props.titleJustifyContent}
          borderTLRadius={props.titleBorderTLRadius}
          borderTRRadius={props.titleBorderTRRadius}
        >
          {props.title}
        </FlexBox>
      )
    }
    {props.fields.map((item, index) => (
      <FieldsGroup
        key={index}
        flexWrap={item.flexWrap}
        alignItems={item.alignItems}
        height={item.fieldGroumHeight}
        width={props.fieldsGroupWidth}
        flexDirection={item.flexDirection}
        justifyContent={item.justifyContent}
        my={R.or(R.or(item.fieldsGroupMarginY, props.fieldsGroupMargin), '5px')}
        mx={R.or(R.or(item.fieldsGroupMarginX, props.fieldsGroupMargin), '5px')}
        zIndex={R.or(R.prop('zIndex', item), R.subtract(props.fields.length, index))}
      >
        {
          R.and(
            R.equals(props.label, true),
            <FlexBox
              color
              pl={R.or(item.labelPl, '10px')}
              width={R.or(item.labelWidth, '30%')}
            >
              <Label
                color={item.labelColor}
                htmlFor={item.fieldName}
                fontWeight={item.labelFontWeight}
                fontSize={R.or(item.labelFontSize, 14)}
                className={H.ifElse(item.isRequired, 'required', 'not-required')}
              >
                {R.or(item.loc, '')}
              </Label>
              {
                H.isNotNilAndNotEmpty(item.info)
                && (
                  <Box ml='8px'>
                    <Info text={R.or(item.info, 'Info')} />
                  </Box>
                )}
            </FlexBox>
          )
        }
        <InputsWrapper
          key={index}
          width={item.width}
          alignItems={item.inputsAlignItems}
          m={R.or(item.inputWrapMargin, '5px 0')}
          flexDirection={item.inputsFlexDirection}
          maxWidth={H.ifElse(
            H.isNotNilAndNotEmpty(item.info),
            props.fieldsGroupWidth,
            item.width,
          )}
        >
          <Inputs
            fieldSettings={item}
            errors={props.errors}
            values={props.values}
            touched={props.touched}
            handlers={props.handlers}
            setValues={props.setValues}
            handleBlur={props.handleBlur}
            handleEnter={props.handleEnter}
            setFieldValue={props.setFieldValue}
            setFieldTouched={props.setFieldTouched}
            optionsForSelect={props.optionsForSelect}
            setOptionsFunction={props.setOptionsFunction}
            handleChange={
              H.ifElse(item.shouldCustomChange, props.handleCustomChange, props.handleChange)} />
          {renderError(props.errors, props.touched, item)}
        </InputsWrapper>
      </FieldsGroup>
    ))}
  </Fieldset>
)});
