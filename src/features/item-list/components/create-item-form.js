import React from 'react';
import * as R from 'ramda';
import * as Yup from 'yup';
import { useField, Formik, withFormik } from 'formik';
import {
  pure,
  compose,
  withHandlers } from 'recompose';
  import  BgImage from '../../../static/bgMain.jpg';
// constants
import * as GC from '../../../global/constants';
// helpers
import * as G from '../../../global/helpers';
// ui
import {
  Box,
  Label,
  Input,
  Button,
  FlexBox,
  PositionedFlex } from '../../../ui';
// ///////////////////////////////////////////////////////


const getValidationSchema = {
  'name': Yup.string()
    .required('Field is Required'),
  'price': Yup.number()
    .positive('Must be a number')
    .required('Field is Required'),
  'total': Yup.number()
    .positive('Must be a number')
    .required('Field is Required'),
  'location': Yup.string()
    .required('Field is Required'),
};

const defaultFields = {
  name: '',
  price: '',
  total: '',
  location: '',
}

export const setInitialFormikValues = (
  defaultValues,
  initialValues,
) => R.merge(defaultValues, initialValues);

const enhance = compose(
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => setInitialFormikValues(
      defaultFields,
      props.initialValues,
    ),
    validationSchema: (props) => Yup.object().shape(getValidationSchema),
    handleSubmit: (values, actoins) => {
      const { props, resetForm, setValues } = actoins;
      props.createItemRequest(values);
      props.setViewForm(!props.viewForm);
      resetForm();
    },
  }),

  pure,
);

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FlexBox
      my='10px'
      width='80%'
      flexDirection='column'
    >
      <Label
        width='100%'
      >
        <Input
          {...field}
          {...props}
          width='100%'
          height='40px'
          inputBackgroundColor='#fff'
          placeholder={props.placeholder}
        />
      </Label>
      {meta.touched && meta.error ? (
        <div
          className="error"
          style={{
            color: '#fff',
            fontSize: '12px',
            marginTop: '5px',
            textAlign: 'center',
          }}
        >
        {meta.error}</div>
      ) : null}
    </FlexBox>
  );
};

export const ItemFormComponent = enhance((props) => (
  <PositionedFlex
    bg='#fff'
    top='100px'
    p='20px 7px'
    right='100px'
    position='absolute'
    borderRadius='15px'
    alignItems='center'
    backgroundSize='cover'
    flexDirection='column'
    transition='all 0.3s linear'
    justifyContent='space-between'
    width={R.or(props.width, '100%')}
    height={R.or(props.height, '100%')}
    boxShadow='0px 10px 40px rgba(27, 0, 70, 0.15)'
    transform={`translateX(${props.viewForm ? '50px' : '540px'})`}
    background={`url(${BgImage}) no-repeat rgba(0,0,0, 0.5) center;`}
  >
    <Box
      mb='15px'
      color='#fff'
      fontSize='30px'
      fontWeight='bold'
      lineHeight='37px'
    >
      Add Item
    </Box>(
    <form
      onSubmit={props.handleSubmit}
      onReset={props.handleReset}
      style={{
        width: '100%',
        display: 'flex',
        height: 'max-content',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <MyTextField name="name" type="text" placeholder="Name" />
      <MyTextField name="price" type="text" placeholder="Price" />
      <MyTextField name="total" type="text" placeholder="Total" />
      <MyTextField name="location" type="text" placeholder="Location" />
      <Button
        mt='30px'
        width='80%'
        color='#fff'
        height='40px'
        type='submit'
        fontSize='16px'
        bg='transparent'
        alignSelf='flex-and'
        justifyContent='center'
        border='1px solid blue'
      >
        Create
      </Button>
    </form>
  </PositionedFlex>
));

export default ItemFormComponent;
