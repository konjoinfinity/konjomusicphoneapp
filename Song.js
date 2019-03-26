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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
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

  deleteSong() {
    fetch(`http://localhost:4000/songs/${this.state.song._id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .then(this.props.navigation.navigate("Songs"));
  }

  render() {
    return (
      <View style={styles.songs}>
        <ScrollView>
          <Image
            style={{ height: 100, width: 200 }}
            source={require("./logo.png")}
          />
          <Text style={{ fontSize: 50, padding: 20 }}>
            Title - {this.state.song.title}
          </Text>
          <Text style={{ fontSize: 45, padding: 20 }}>
            Author - {this.state.song.author}
          </Text>
          <Text style={{ fontSize: 40, padding: 20 }}>
            Notes - {this.state.song.notes}
          </Text>
          <Text style={{ fontSize: 40, padding: 20 }}>
            Lyrics - {this.state.song.lyrics}
          </Text>
          <TouchableOpacity
            style={styles.songButton}
            onPress={() => this.props.navigation.navigate("Songs")}
          >
            <Text style={styles.songButtonText}>Go to Songs</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={this.deleteSong}
            >
              <Text style={styles.deleteButtonText}>Delete Song</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 15
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#FF1717",
    backgroundColor: "#FF1717",
    padding: 15,
    margin: 5
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  },
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
  songs: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SongScreen;
