
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment'
import { ButtonGroup } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from 'react-native';

const DATA = [
  {
    date: 'Thứ 7, 14-12-2019',
    data: [{ name: 'Ca thứ 7', time: '8:30-17:30', number: '00:00-00:00' }, { name: 'Ca tối', time: '8:30-17:30', number: '00:00-00:00' }],
  },
  {
    date: 'Thứ Hai, 14-12-2019',
    data: [{ name: 'Ca thực tập', time: '8:30-17:30', number: '00:00-00:00' }],
  },
  {
    date: 'Thứ Hai, 14-12-2019',
    data: [{ name: 'Ca thực tập', time: '8:30-17:30', number: '00:00-00:00' }],
  },


];

function Item({ data }) {

  return (
    <TouchableOpacity
      style={styles.item}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ paddingLeft: 10, }}>
          <Text style={{ fontWeight: 'bold', }}>{data.name}</Text>
          <Text>({data.time})</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
        <Icon
          name='subway'
          size={10}
          style={{ paddingRight: 10, }}
        />
        <Text style={{ paddingRight: 10, fontWeight: 'bold' }}>00:00-00:00</Text>
        <Icon
          name='chevron-right'
          size={16}
          color='#aaafb3'
          style={{ paddingRight: 10, }}
        />

      </View>



    </TouchableOpacity>
  );

}


export default class Calendar_Activity extends Component {

  static navigationOptions = () => ({

    headerTitle: () => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18 }}>
          Lịch công
                 </Text>
      </View>
    ),
  });
  constructor() {
    super()
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }




  render() {
    console.log(this.props)
    const buttons = ['Ngày công', 'Công việc'];
    const { selectedIndex } = this.state
    return (
      this.props.isLoading?

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <ActivityIndicator size="large" color="#00ff00" />
          <StatusBar barStyle="default" />
        </View>

        :
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',maxHeight:80 }}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              selectedButtonStyle={backgroundColor = '#00ff00'}
              buttons={buttons}
              containerStyle={{ height: 30, width: 300, borderRadius: 15, borderColor: '#00ff00' }}

            />

          </View>

          <SectionList
            sections={this.props.data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item data={item} />}
            renderSectionHeader={({ section: { date } }) => (
              <Text style={styles.header}>{date}</Text>
            )}
            stickySectionHeadersEnabled={true}
          />
        </SafeAreaView>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Open Sans'
  },
  item: {
    padding: 14,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4
  },
  header: {
    fontSize: 20,
    backgroundColor: '#5af542',
    color: 'white',
    padding: 10,
    paddingLeft: 20,
  },
  data: {
    fontSize: 24,
  },


});

