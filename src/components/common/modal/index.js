import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
// icon
import * as I from '../../../icons';
// ui
import {
  PositionedBox,
  PositionedFlex,
  tableScrollBarStyleModal } from '../../../ui';
// modal
import {
  setOpenModal,
  setCloseModal } from './actions';
import {
  makeSelectModalIsOpen,
  makeSelectModalContent,
  makeSelectModalStyleContent } from './selectors';
// ////////////////////////////////////////////////////////////////////////////////////////////////


const defaultModalStyles = {
  top: '40px',
  mb: '30px',
  display: 'flex',
  overflow: 'unset',
  minHeight: '100vh',
  position: 'absolute',
  alignItems: 'flex-start',
  justifyContent: 'center',
}

export const CloseIcon = (props) => (
  <PositionedBox
    top='20px'
    zIndex='11'
    right='40px'
    color='#fff'
    border='none'
    fontSize='20px'
    cursor='pointer'
    position='absolute'
    onClick={props.closeModal}
  >
    {I.closeIcon()}
  </PositionedBox>
);


export const ModalComponent = (props) => {
  const modalStyles = R.or(R.path(['modalStyle'], props), defaultModalStyles);
  return (
    <PositionedFlex
      top='0'
      zIndex='1000'
      width='100vw'
      height='100vh'
      display='flex'
      position='fixed'
      overflow='scroll'
      alignItems='center'
      justifyContent='center'
      bg='rgba(53, 53, 53, 0.5)'
      additionalStyles={tableScrollBarStyleModal}
    >
      <PositionedFlex
        zIndex='5'
        {...modalStyles}
        borderRadius='2px'
      >
        <CloseIcon closeModal={props.setCloseModal} />
        {props.modalContent}
      </PositionedFlex>

    </PositionedFlex>
  );
};

const mapStateToProps = (state) => (createStructuredSelector({
  modalOpened: makeSelectModalIsOpen(state),
  modalContent: makeSelectModalContent(state),
  modalStyle: makeSelectModalStyleContent(state),
}));

export default connect(mapStateToProps, {
  setOpenModal,
  setCloseModal,
})(ModalComponent);

