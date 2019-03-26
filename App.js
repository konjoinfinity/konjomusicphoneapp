import React from "react";
import {
  Button,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SongsScreen from "./Songs";
import SongScreen from "./Song";
import NewScreen from "./New";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ height: 100, width: 200 }}
          source={require("./logo.png")}
        />
        <Text style={{ fontSize: 50 }}>Music</Text>

        <TouchableOpacity
          style={styles.songButton}
          onPress={() => this.props.navigation.navigate("Songs")}
        >
          <Text style={styles.songButtonText}>Go to Songs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => this.props.navigation.navigate("New")}
        >
          <Text style={styles.newButtonText}>New Song</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  songButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5
  },
  songButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  },
  newButton: {
    borderWidth: 1,
    borderColor: "#12C16D",
    backgroundColor: "#12C16D",
    padding: 15,
    margin: 5
  },
  newButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Songs: SongsScreen,
    Song: SongScreen,
    New: NewScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
