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
    this.getSongs = this.getSongs.bind(this);
  }

  componentDidMount() {
    fetch("http://konjomusicbackend.herokuapp.com/songs")
      .then(res => res.json())
      .then(res => {
        this.setState({ songs: res });
      });
  }

  getSongs() {
    fetch("http://konjomusicbackend.herokuapp.com/songs")
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
          <TouchableOpacity
            style={styles.songButton}
            key={id}
            onPress={() =>
              this.props.navigation.navigate("Song", { songId: `${song._id}` })
            }
          >
            <Text style={styles.songButtonText}>{song.title}</Text>
          </TouchableOpacity>
        );
      }));
    return (
      <View style={styles.songs}>
        <ScrollView>
          <Image
            style={{ height: 100, width: 200 }}
            source={require("./logo.png")}
          />
          <Text style={{ fontSize: 50, justifyContent: "center", padding: 20 }}>
            Songs
          </Text>
          {songs}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  songButton: {
    borderWidth: 1,
    borderColor: "#12C16D",
    backgroundColor: "#12C16D",
    padding: 15,
    margin: 5
  },
  songButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  },
  songs: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SongsScreen;
