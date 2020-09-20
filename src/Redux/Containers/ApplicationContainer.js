import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Application } from '../../Pages/Application';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const ApplicationContainer = connect(mapStateToProps, mapDispatchToProps)(Application);
