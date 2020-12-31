import Object from './ObjectList';
import { connect } from 'react-redux';
import { getData } from '../../../selectors';
import { getRequest, postRequest } from '../../../actions/app.actions';
import { navigate } from '../../../utils/navigate';
import * as  COMPANY from '../../../actionTypes/company.actiontypes';

class PositionContainer extends Object {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.dispatch(getRequest(COMPANY.POS_REQUESTING))
        this.props.navigation.setParams({ onPressHeader: () => this.onPressHeader() })
    };

    onPressHeader = () => {
        navigate('ObjectAdd', { onPress: data => this.onAddPosition(data) })
    };

    onPressItem = data => {
        console.log('Pressed Item')
        console.log(data)
        navigate('ObjectDetails', { data, onPress: data => this.onSavePosition(data), onDel: id => this.onDelPosition(id) })
    }


    onAddPosition = data => {
        this.props.dispatch(postRequest(COMPANY.POS_ADD, data))
        console.log('Add SAVE CALLBACK');
        console.log(data);
        console.log(data)
    }

    
    onDelPosition = id => {
        this.props.dispatch(getRequest(COMPANY.POS_DEL, id))
        console.log('DEL CALLBACK');
        console.log(id)
    }

    onSavePosition = newdata => {
        this.props.dispatch(postRequest(COMPANY.POS_EDIT, newdata))
        console.log('EDIT CALLBACK');
        console.log(newdata)
    }

}


const mapStateToProps = state => ({
    data: getData(state, 'position', 'data'),
    isLoading: getData(state, 'position', 'requesting')
});

export default connect(
    mapStateToProps,
    null,
)(PositionContainer);
