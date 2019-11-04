import React from 'react';
// global
import * as G from '../../../global/helpers';
// components text
import { Text } from './ui';
///////////////////////////////////////////////////////////////////////////////////////////////////

const TextComponent = (props) => {
  const { title, children } = props;
  if (G.isNotNil(title)) {
    return (
      <Text
        {...props}
        title={title}
      >
        {children}
      </Text>
    );
  }
  return (
    <Text {...props}>
      {children}
    </Text>
  );
};

export default TextComponent;
