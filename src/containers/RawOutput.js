import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RawOutput from '../components/RawOutput';
import * as CodeActions from '../actions/code';

function mapStateToProps(state) {
  return {
    ...state.code
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CodeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RawOutput);
