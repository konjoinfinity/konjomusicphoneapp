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

class NewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: ""
    };
  }

  render() {
    return (
      <ScrollView>
        <Text style={{ fontSize: 50, justifyContent: "center", padding: 20 }}>
          New Song Screen
        </Text>
      </ScrollView>
    );
  }
}
export default NewScreen;
