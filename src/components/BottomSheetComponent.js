import React from 'react';
import {Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export const BottomSheetComponent = React.forwardRef((props, ref) => {
  const open = () => {
    ref.current.open();
  };

  const close = () => {
    ref.current.close();
  };

  return (
    <>
      <RBSheet
        ref={ref}
        height={Dimensions.get('window').width / 2}
        openDuration={250}
        closeDuration={1000}
        customStyles={{
          container: {
            flex: 1,
            padding: 16,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}>
        {props.children}
      </RBSheet>
    </>
  );
});
