import Shift from './Shift';
import { connect } from 'react-redux';
import { getData } from '../../../selectors';
import { getRequest, postRequest } from '../../../actions/app.actions';
import { navigate } from '../../../utils/navigate';
import * as  SHIFT from '../../../actionTypes/shift.actiontypes';

class ShiftContainer extends Shift {
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
        this.props.dispatch(getRequest(SHIFT.SHIFT_REQUESTING))
        this.props.navigation.setParams({ onPressHeader: this.onPressHeader })
    };

    onPressHeader = () => {
        navigate('ShiftDetail', { onPress: data => this.onAddShift(data) })
    };

    onPressItem = data => {
        console.log('Pressed Item')
        console.log(data)
        navigate('ShiftDetail', { data, onPress: data => this.onSaveShift(data), onDel: id => this.onDelShift(id) })
    }


    onAddShift = data => {
        this.props.dispatch(postRequest(SHIFT.SHIFT_ADD, data))
        console.log('Add SAVE CALLBACK');
        console.log(data);
        console.log(data)
    }

    
    onDelShift = id => {
        this.props.dispatch(getRequest(SHIFT.SHIFT_DEL, id))
        console.log('DEL CALLBACK');
        console.log(id)
    }

    onSaveShift = newdata => {
        this.props.dispatch(postRequest(SHIFT.SHIFT_EDIT, newdata))
        console.log('EDIT CALLBACK');
        console.log(newdata)
    }

}


const mapStateToProps = state => ({
    data: getData(state, 'shift', 'data'),
    isLoading: getData(state, 'shift', 'requesting')
});

export default connect(
    mapStateToProps,
    null,
)(ShiftContainer);
