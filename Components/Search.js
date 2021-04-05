// Components/Search.js

import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TDMBiAPI";
import films from "../helpers/FilmData";

class Search extends React.Component {
  _loadFilms() {
    this.setState({ isLoading: true });
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText,this.page+1)
      .then((data) =>{
        this.page=data.page
        this.totalPage=data.total_pages
        this.setState({
          films: [...this.state.films,...data.results],
          isLoading: false,
        })
      }
       
      );
    }
  }

  constructor(props) {
    super(props);
    this.page=0
    this.totalPage=0
    this.state = {
      films: [],
      isLoading: false,
    };
    this.searchedText = "";
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      );
    }
  }
  _searchFilms(){
    this.page=0
    this.totalPage=0
    this.setState({
      films:[]
    },()=>{ console.log("page:"+this.page+'/Total page :'+this.totalPage+'/Nombre de page'+this.state.films.length)
            this._loadFilms()}
    )

  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }
  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail",{idFilm:idFilm})
  }
  
  render() {
    console.log(this.state.isLoading);
    return (
      <View style={styles.main_container} >
        <TextInput
          onSubmitEditing={() => this._searchFilms()}
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
        />
        <Button
          title="Rechercher"
          onPress={() => {
            this._searchFilms();
          }}
        />
        <FlatList
          data={this.state.films}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if(this.page<this.totalPage){
              this._loadFilms()
            }
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item}  displayDetailForFilm={this._displayDetailForFilm}/>}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 200,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
