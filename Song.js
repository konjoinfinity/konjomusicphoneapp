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

class SongScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: ""
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:4000/songs/${this.props.navigation.state.params.songId}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ song: res });
      });
  }

  render() {
    return (
      <ScrollView>
        <Text style={{ fontSize: 50, padding: 20 }}>
          Title - {this.state.song.title}
        </Text>
        <Text style={{ fontSize: 45, padding: 20 }}>
          Author - {this.state.song.author}
        </Text>
        <Text style={{ fontSize: 40, padding: 20 }}>
          Lyrics - {this.state.song.lyrics}
        </Text>
        <Button
          title="Go to Songs"
          onPress={() => this.props.navigation.navigate("Songs")}
        />
      </ScrollView>
    );
  }
}

export default SongScreen;
