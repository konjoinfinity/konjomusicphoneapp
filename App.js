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
        <Button
          title="Go to Songs"
          onPress={() => this.props.navigation.navigate("Songs")}
        />
        <Button
          title="New Song"
          onPress={() => this.props.navigation.navigate("New")}
        />
      </View>
    );
  }
}

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
