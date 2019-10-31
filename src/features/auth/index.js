import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { useField, Formik } from 'formik';
import { createStructuredSelector } from 'reselect';
import  BgImage from '../../static/bgMain.jpg';
// constants
import * as GC from '../../global/constants';
// helpers
import * as G from '../../global/helpers';
// action item list
import { getItemListRequest } from '../item-list/actions'
// ui
import {
  Box,
  Label,
  Input,
  Button,
  FlexBox,
  PositionedFlex } from '../../ui';
import { hoverButton } from './ui';
// ///////////////////////////////////////////////////////

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FlexBox
      width='80%'
    >
      <Label
        width='100%'
      >
        <Input
          {...field}
          {...props}
          width='100%'
          height='40px'
          placeholder='Email'
          inputBackgroundColor='#fff'
        />
      </Label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </FlexBox>
  );
};

export const SingInForm = (props) => (
  <FlexBox
    bg='#fff'
    width='100vw'
    height='100vh'
    alignItems='center'
    backgroundSize='auto'
    flexDirection='column'
    justifyContent='center'
    background={`url(${BgImage}) no-repeat center`}
  >
    <PositionedFlex
      bg='#fff'
      top='30px'
      left='70px'
      p='0 10px'
      height='40px'
      fontSize='20px'
      cursor='pointer'
      position='fixed'
      alignItems='center'
      width='max-content'
      justifyContent='center'
      boxShadow='0px 10px 40px rgba(27, 0, 70, 0.15)'
    >
      test@gmail.com
    </PositionedFlex>
    <FlexBox
      bg='rgba(0, 0, 0, 0.4)'
      width='600px'
      height='300px'
      alignItems='center'
      flexDirection='column'
      justifyContent='center'
    >
      <Box
        color='#fff'
        fontSize='30px'
        fontWeight='bold'
        lineHeight='37px'
      >
        Welcome
        </Box>
        <Formik
          initialValues={{ email: ''}}
          onSubmit={(values, actions) => {
            if (R.equals(R.path(['email'], values), 'test@gmail.com')) {
              const data = {
                loggedIn: true,
              }
              G.setSessionStorage('auth', data);
              const list = G.getItemFromLocalStorage('list');
              if (G.isNotNilAndNotEmpty(list)) {
                props.getItemListRequest(list)
              }
              G.goToRoute(GC.ROUTE_PATH_HOME);
            }
          }}
          render={(props: FormikProps<Values>) => (
            <form
              onSubmit={props.handleSubmit}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                height: 'calc(100% - 200px)',
              }}
            >
              <MyTextField name="email" type="email" label="Email" />
              <Button
                mt='30px'
                width='80%'
                color='#fff'
                height='40px'
                type='submit'
                fontSize='16px'
                bg='transparent'
                alignItems='center'
                justifyContent='center'
                border='1px solid blue'
                additionalStyles={hoverButton}
              >
                Sing In
              </Button>
            </form>
          )}
        />
    </FlexBox>
  </FlexBox>
);

const mapStateToProps = (state) => (createStructuredSelector({
}));

export default connect(mapStateToProps, {
  getItemListRequest
})(SingInForm);
