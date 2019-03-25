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

class SongsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/songs")
      .then(res => res.json())
      .then(res => {
        this.setState({ songs: res });
      });
  }

  render() {
    let songs;
    this.state.songs &&
      (songs = this.state.songs.map((song, id) => {
        return (
          <Button
            key={id}
            title={song.title}
            onPress={() =>
              this.props.navigation.navigate("Song", { songId: `${song._id}` })
            }
          />
        );
      }));
    return (
      <ScrollView>
        <Text style={{ fontSize: 50, justifyContent: "center", padding: 20 }}>
          Songs Screen
        </Text>
        {songs}
      </ScrollView>
    );
  }
}
export default SongsScreen;
