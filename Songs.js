import React from "react";
import {
  Button,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Vibration
} from "react-native";

class SongsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: ""
    };
    this.getSongs = this.getSongs.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  componentDidMount() {
    fetch("http://konjomusicbackend.herokuapp.com/songs")
      .then(res => res.json())
      .then(res => {
        this.setState({ songs: res });
      });
    Vibration.vibrate();
  }

  getSongs() {
    fetch("http://konjomusicbackend.herokuapp.com/songs")
      .then(res => res.json())
      .then(res => {
        this.setState({ songs: res });
      });
  }

  upVote(e) {
    console.log(e);
    const data = { body: e };
    fetch("http://konjomusicbackend.herokuapp.com/votes/upvote", {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getSongs();
        Vibration.vibrate();
      });
  }

  downVote(e) {
    console.log(e);
    const data = { body: e };
    fetch("http://konjomusicbackend.herokuapp.com/votes/downvote", {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getSongs();
        Vibration.vibrate();
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
            <Text style={styles.songButtonText}>Votes: {song.votes}</Text>
            <TouchableOpacity
              style={styles.upButton}
              onPress={() => this.upVote(`${song._id}`)}
            >
              <Text style={styles.upButtonText}>Upvote ⬆️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.downButton}
              onPress={() => this.downVote(`${song._id}`)}
            >
              <Text style={styles.downButtonText}>Downvote ⬇️</Text>
            </TouchableOpacity>
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
    margin: 5,
    borderRadius: 15
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
  },
  downButton: {
    borderWidth: 0,
    borderColor: "#FFD517",
    backgroundColor: "#FFD517",
    padding: 10,
    margin: 5,
    borderRadius: 15
  },
  downButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  },
  upButton: {
    borderWidth: 0,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 5,
    borderRadius: 15
  },
  upButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});

export default SongsScreen;
