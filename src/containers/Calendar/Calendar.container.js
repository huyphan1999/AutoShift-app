import Calendar from './Calendar';
import {connect} from 'react-redux';
import {getData} from '../../selectors/index';

class CalendarContainer extends Calendar {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
      this.props.dispatch({type:'CALENDAR_REQUESTING'})
  };
  
}


const mapStateToProps = state => ({
  data:getData(state,'calendar','data'),
  isLoading:getData(state,'calendar','requesting')
});

export default connect(
  mapStateToProps,
  null,
)(CalendarContainer);
