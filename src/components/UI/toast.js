// @flow

import * as React                 from "react";
import { ToastContainer, toast }  from 'react-toastify';
import { css }                    from 'glamor';
import { Transition }                 from 'react-transition-group';

import { connect }            from 'react-redux';
import { Creators }           from 'app/actions/index';
import { bindActionCreators } from 'redux';

import type { StatusMessage } from 'app/types';

const animationWrapperCSS = css({
  transition: `all 300ms ease-out`,
  opacity: '0',
  transform: 'translateY(150%)',
  '&.is-entered': {
    opacity: '1',
    transform: 'translateY(0)'
  },
  '&.is-exited': {
    transform: 'translateY(150%)'
  }
});

const AnimationWrapper = ( { children, ...props } ) => (
  <Transition { ...props } timeout={ 300 }>
    { state => (
      <div className={`is-${ state } ${ animationWrapperCSS }`}>
        { children }
      </div>
    ) }
  </Transition>
);

export type Props = {
  AppLastResponse: typeof Creators.AppLastResponse,
  statusMessage: StatusMessage,
}

export type State = {}

class Toast extends React.Component<Props, State> {

  constructor ( ) {
    super();
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.statusMessage.response ) {
      if ( nextProps.statusMessage.success ) {
        toast.success( nextProps.statusMessage.response, {
          position: toast.POSITION.BOTTOM_CENTER,
          transition: AnimationWrapper,
          newestOnTop: true,
          autoClose: 3000
        });
      } else {
        toast.warn( nextProps.statusMessage.response, {
          position: toast.POSITION.BOTTOM_CENTER,
          newestOnTop: true,
          autoClose: 3000
        });
      }
    }
  }

  render () {
    return (
      <ToastContainer />
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Toast );