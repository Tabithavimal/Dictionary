import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Header } from 'react-native-elements';
 
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definition: '', 
      phonetics: '',
    };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'yellow'}
          centerComponent={{
            text: 'Pocket Dictionary',

            style: {
              backgroundColor: 'yellow',
            
              fontSize: 20
            },
          }}
        />
       

        <TextInput
          style={styles.searchBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'Loading....',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.text1}> Search </Text>
        </TouchableOpacity>

        <Text style={styles.text}>{this.state.word}</Text>
        <Text style={styles.text}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 4,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  searchButton: {
    width: '40%',
    height: 50,
    marginLeft:100,
    marginTop:20,
    borderWidth: 4,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  text1: {
    textAlign: 'center',   
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
color:'white',
  },
});
