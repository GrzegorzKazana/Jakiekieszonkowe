import React from "react";
import {
  TextField,
  IconButton,
  Divider,
  Typography,
  LinearProgress
} from "@material-ui/core";
import { Person, Star, StarBorder, Send } from "@material-ui/icons";

const CommentComponent = props => (
  <div style={{ padding: "0px 4px" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div
        style={{
          padding: "8px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <Person />
        {props.comment.author}
      </div>
      <div
        style={{
          padding: "8px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <Typography variant="subtitle1">{props.comment.upvotes}x</Typography>
        <IconButton
          style={{ padding: "0px" }}
          onClick={() => props.onCommentUpvoteChange(props.comment.id)}
        >
          {props.comment.liked ? <Star /> : <StarBorder />}
        </IconButton>
      </div>
    </div>
    <Typography style={{ padding: "0px 8px 8px 8px", wordWrap: "break-word" }}>
      {props.comment.content}
    </Typography>
  </div>
);

class CommentInput extends React.Component {
  state = { inputText: "" };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-end",
          padding: "4px"
        }}
      >
        <div style={{ padding: "0px 0px 0px 8px", flexGrow: "1" }}>
          <TextField
            label="Dodaj komentarz"
            value={this.state.inputText}
            onChange={e => this.setState({ inputText: e.target.value })}
            multiline
            fullWidth
          />
        </div>
        <IconButton
          style={{ padding: "8px" }}
          onClick={() => {
            this.props.onCommentPost(this.state.inputText);
            this.setState({ inputText: "" });
          }}
        >
          <Send />
        </IconButton>
      </div>
    );
  }
}

class MapDrawerContentComments extends React.Component {
  render() {
    const progressBar = (
      <LinearProgress
        color="secondary"
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          zIndex: "1000"
        }}
      />
    );

    return (
      <div
        style={{
          height: "100%",
          position: "relative",
          ...this.props.style,
          overflow: "auto",
          overflowX: "hidden",
          animation: "slide-up 0.4s ease"
        }}
      >
        {this.props.loading && progressBar}
        <Typography variant="h4" style={{ padding: "8px 8px 0px 8px" }}>
          Komentarze
        </Typography>
        <Divider style={{ margin: "16px" }} />
        {this.props.comments.map((comment, idx) => (
          <div key={idx}>
            <CommentComponent
              comment={comment}
              onCommentUpvoteChange={this.props.onCommentUpvoteChange}
            />
            <Divider />
          </div>
        ))}
        <CommentInput onCommentPost={this.props.onCommentPost} />
      </div>
    );
  }
}
export default MapDrawerContentComments;
