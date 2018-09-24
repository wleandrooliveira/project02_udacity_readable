import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../utils/api";
import "./App.css";
import { addPost } from "../actions";
import CommentListHeader from "./CommentListHeader";
import NewCommentForm from "./NewCommentForm";
import CommentList from "./CommentList";
import Post from "./Post";

class PostDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.post;

    getPost(id).then(post => {
      this.props.dispatch(addPost(post));
    });
  }

  render() {
    const { post } = this.props;

    return (
      <main>
        {post && (
          <article key={post.id} className="PostDetail">
            <Post id={post.id} />
            <CommentListHeader
              commentCount={this.props.commentCount}
              postId={post.id}
              newCommentFormOpen={this.props.newCommentFormOpen}
            />
            {this.props.newCommentFormOpen && (
              <div>
                <div>
                  <NewCommentForm postId={this.props.post.id} />
                </div>
              </div>
            )}
            {this.props.comment_count > 0 && <CommentList id={post.id} />}
          </article>
        )}
      </main>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.post;

  const comment_keys = Object.keys(state.comments);
  const comment_count = comment_keys
    .map(comment_key => state.comments[comment_key])
    .filter(comment => comment.parentId === id).length;

  return {
    post: state.posts[id],
    comment_count: comment_count,
    newCommentFormOpen:
      state.newCommentForms[id] && state.newCommentForms[id].newCommentFormOpen
  };
}

export default connect(mapStateToProps)(PostDetail);
