import React, { Component } from "react";
import "./Comments.css";
import API from "../../utils/API";

class Comments extends Component {
  state = {
    newComment: "",
    comments: []
  }

  componentDidMount() {
    this.setState({ comments: this.props.comments });
  }

  submitComment = event => {
    event.preventDefault();
    API.saveComment({
      text: this.state.newComment,
      picture: this.props.pictureId,
      user: this.props.userId
    }).then(res => this.setState({ newComment: "", comments: this.state.comments.concat([res.data]) }))
    
  }

  upvoteComment = (commentId, newUpvoteCount) => {
   // event.preventDefault();
    
     API.updateComment(commentId, {
       upvoteCount: newUpvoteCount +1
     }).then(res => console.log(res));
  }

  downvoteComment = (commentId, newUpvoteCount) => {
    // event.preventDefault();
     
      API.updateComment(commentId, {
        upvoteCount: newUpvoteCount -1
      }).then(res => console.log(res));
   }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (

      <div className="col-md-7" id="comments-container">
        <form>
          <div className="form-group">
            <textarea className="form-control" id="comment" rows="3" name="newComment" value={this.state.comment} onChange={this.handleInputChange} placeholder="What do you think it is?"></textarea>
          </div>
          <button id="comment-submit" type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.submitComment}>Submit</button>
        </form>
        <ul className="comment-list list-group list-group-flush">
          {this.state.comments.map(comment => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={comment._id}>
              {comment.user}
              {comment.text}
              <span id="upvote-badge" className="badge badge-primary badge-pill">
              <i id="arrow-up" className="fas fa-arrow-alt-circle-up" onClick={() => this.upvoteComment(comment._id, comment.upvoteCount)}/>
              <i id="arrow-down" className="fas fa-arrow-alt-circle-down" onClick={() => this.downvoteComment(comment._id, comment.upvoteCount)} /></span>
              <span className="badge badge-primary badge-pill" key={comment._id}>{comment.upvoteCount}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments;