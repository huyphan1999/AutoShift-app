import TimeKeep from './TimeKeep';
import {connect} from 'react-redux';
import {getData} from '../../selectors/index';

class TimeKeepContainer extends TimeKeep {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
      this.props.dispatch({type:'TIMEKEEP_REQUESTING'})
  };
  
}


const mapStateToProps = state => ({
  data:getData(state,'timekeep','data'),
  isLoading:getData(state,'timekeep','requesting')
});

export default connect(
  mapStateToProps,
  null,
)(TimeKeepContainer);
