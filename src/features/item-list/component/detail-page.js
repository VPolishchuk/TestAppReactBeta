import * as R from 'ramda';
import { connect } from 'react-redux';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectItem } from '../selectors';
import './style.scss';
///////////////////////////////////////////////////////////

const DetailPageComponent = ({ details }) => (
    <div className='detail-wrap'>
      <div className='cart'>
        <h3>Employee</h3>
        {
          R.keys(details).map(
            (item, i) => (
              <div key={i} className=''>
                {`${item}: ${details[item]}`}
              </div>
            )
          )
        }
      </div>
    </div>
)




const mapStateToProps = (state) => (createStructuredSelector({
    details: makeSelectItem(state),
}));
  
export default connect(mapStateToProps, {

})(DetailPageComponent);