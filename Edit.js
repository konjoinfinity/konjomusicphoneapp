import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableOpacity
} from "react-native";

class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      notes: "",
      lyrics: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleLyricsChange = this.handleLyricsChange.bind(this);
  }

  componentDidMount() {
    fetch(
      `http://localhost:4000/songs/${this.props.navigation.state.params.songId}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          title: res.title,
          author: res.author,
          notes: res.notes,
          lyrics: res.lyrics
        });
      });
  }

  handleTitleChange(title) {
    this.setState({ title });
  }
  handleAuthorChange(author) {
    this.setState({ author });
  }
  handleNotesChange(notes) {
    this.setState({ notes });
  }
  handleLyricsChange(lyrics) {
    this.setState({ lyrics });
  }

  handleSubmit() {
    const data = this.state;
    fetch("http://localhost:4000/songs", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    this.props.navigation.navigate("Songs");
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ height: 100, width: 200 }}
          source={require("./logo.png")}
        />
        <View>
          <Text style={styles.header}>Edit Song</Text>
          <ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={this.state.title}
                name="title"
                id="title"
                onBlur={Keyboard.dismiss}
                onChangeText={this.handleTitleChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={this.state.author}
                name="author"
                id="author"
                onBlur={Keyboard.dismiss}
                onChangeText={this.handleAuthorChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={this.state.notes}
                name="notes"
                id="notes"
                onBlur={Keyboard.dismiss}
                onChangeText={this.handleNotesChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={this.state.lyrics}
                name="lyrics"
                id="lyrics"
                onBlur={Keyboard.dismiss}
                onChangeText={this.handleLyricsChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={this.handleSubmit}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});

export default EditScreen;
