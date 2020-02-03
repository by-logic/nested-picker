import React, {Component} from 'react';
import {View, Picker} from 'react-native';
export default class App extends Component {
  state = {
    dataProvinsi: [],
    idprovinsi: '',
    dataKota: [],
    idkota: ''
  };
  componentDidMount = () => {
    this.getProvinsi();
  };

  getProvinsi = () => {
    fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi', {
      method: 'get',
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataProvinsi: responseJson.semuaprovinsi});
      })
      .catch(error => {
        console.error(error);
      });
  };

  getKota = idprovinsi => {
    if (idprovinsi !== '') {
      fetch(
        `http://dev.farizdotid.com/api/daerahindonesia/provinsi/${idprovinsi}/kabupaten`,
        {
          method: 'get',
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({dataKota: responseJson.kabupatens});
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.setState({dataKota: [], idkota: ''});
    }
  };
  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.idprovinsi}
          style={{
            height: 50,
            width: '80%',
            marginHorizontal: '10%',
            marginTop: 20,
          }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({idprovinsi: itemValue});
            this.getKota(itemValue);
          }}>
          <Picker.Item label="Pilih Provinsi" value="" />
          {this.state.dataProvinsi &&
            this.state.dataProvinsi.length > 0 &&
            this.state.dataProvinsi.map(item => (
              <Picker.Item label={item.nama} value={item.id} />
            ))}
        </Picker>
        <Picker
          selectedValue={this.state.idkota}
          style={{
            height: 50,
            width: '80%',
            marginHorizontal: '10%',
            marginTop: 20,
          }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({idkota: itemValue})
          }>
          <Picker.Item label="Pilih Kota" value="" />
          {this.state.dataKota &&
            this.state.dataKota.length > 0 &&
            this.state.dataKota.map(item => (
              <Picker.Item label={item.nama} value={item.id} />
            ))}
        </Picker>
      </View>
    );
  }
}
