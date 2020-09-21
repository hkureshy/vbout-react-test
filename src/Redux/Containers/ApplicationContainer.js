import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Application } from '../../Pages/Application';
import { addGrudge, toggleForgiveness, undo, redo } from '../Actions/Change';

const mapStateToProps = state => {
  return {
    grudges: state.changeReducer.grudges
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGrudge: bindActionCreators(addGrudge, dispatch),
    toggleForgiveness: bindActionCreators(toggleForgiveness, dispatch),
    undo: bindActionCreators(undo, dispatch),
    redo: bindActionCreators(redo, dispatch)
  };
};

export const ApplicationContainer = connect(mapStateToProps, mapDispatchToProps)(Application);
