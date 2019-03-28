import React from "react";
import {
  Button,
  TextInput,
  Keyboard,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-elements";

class SongScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: "",
      comment: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleCommentChange(comment) {
    this.setState({ comment });
  }

  componentDidMount() {
    fetch(
      `http://konjomusicbackend.herokuapp.com/songs/${
        this.props.navigation.state.params.songId
      }`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ song: res });
      });
  }

  getSong() {
    fetch(`http://konjomusicbackend.herokuapp.com/songs/${this.state.song._id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ song: res });
      });
  }

  deleteSong() {
    fetch(
      `http://konjomusicbackend.herokuapp.com/songs/${this.state.song._id}`,
      {
        method: "DELETE"
      }
    )
      .then(res => res.json())
      .then(res => console.log(res))
      .then(this.props.navigation.navigate("Home"));
  }

  deleteComment(e) {
    console.log(e);
    const data = { body: e };
    fetch(
      `http://konjomusicbackend.herokuapp.com/songs/${
        this.state.song._id
      }/delete`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getSong();
      });
  }

  handleComment() {
    const data = { comment: this.state.comment };
    fetch(
      `http://konjomusicbackend.herokuapp.com/songs/${
        this.state.song._id
      }/comment`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getSong();
      });
  }

  render() {
    let commentlist;
    this.state.song &&
      (commentlist = this.state.song.comments.map((comment, id) => {
        return (
          <TouchableOpacity key={id} style={styles.comment}>
            <Text style={{ fontSize: 40, padding: 20 }}>{comment.text}</Text>
            <Button
              title="Delete"
              onPress={() => this.deleteComment(`${comment._id}`)}
              style={styles.deleteButton}
            />
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
          <Card>
            <Text style={{ fontSize: 50, padding: 20 }}>
              Title - {this.state.song.title}
            </Text>
          </Card>
          <Card>
            <Text style={{ fontSize: 45, padding: 20 }}>
              Author - {this.state.song.author}
            </Text>
          </Card>
          <Card>
            <Text style={{ fontSize: 40, padding: 20 }}>
              Notes - {this.state.song.notes}
            </Text>
          </Card>
          <Card>
            <Text style={{ fontSize: 40, padding: 20 }}>
              Lyrics - {this.state.song.lyrics}
            </Text>
          </Card>
          <Card>
            <TouchableOpacity
              style={styles.songButton}
              onPress={() => this.props.navigation.navigate("Songs")}
            >
              <Text style={styles.songButtonText}>Go to Songs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                this.props.navigation.navigate("Edit", {
                  songId: `${this.state.song._id}`
                })
              }
            >
              <Text style={styles.editButtonText}>Edit Song</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={this.deleteSong}
            >
              <Text style={styles.deleteButtonText}>Delete Song</Text>
            </TouchableOpacity>
          </Card>
          <Card>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                name="comment"
                id="comment"
                onBlur={Keyboard.dismiss}
                onChangeText={this.handleCommentChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={this.handleComment}
              >
                <Text style={styles.saveButtonText}>Add Comment</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <Text style={{ fontSize: 40, padding: 20 }}>Comments</Text>
          <Card>{commentlist}</Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
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
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#FFD517",
    backgroundColor: "#FFD517",
    padding: 15,
    margin: 5
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  },
  comment: {
    borderWidth: 1,
    borderColor: "#FFB944",
    backgroundColor: "#FFB944",
    padding: 15,
    margin: 5
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#12C16D",
    backgroundColor: "#12C16D",
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});

export default SongScreen;
