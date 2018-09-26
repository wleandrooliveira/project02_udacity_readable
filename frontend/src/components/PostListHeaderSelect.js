import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCategorySort } from "../actions";
import "./App.css";

class PostListHeaderSelect extends Component {
  handleSortChange = e => {
    this.props.dispatch(
      changeCategorySort({
        category: this.props.categoryName,
        sortValue: e.target.value
      })
    );
  };

  render() {
    return (
      <select
        className="PostListHeaderSelect"
        value={this.props.categorySort}
        onChange={this.handleSortChange}
      >
        <option value="voteScore">Votos</option>
        <option value="timestamp">Recentes</option>
      </select>
    );
  }
}

function mapStateToProps(state) {
  const sortBy = state.categorySorts[state.categoryFilter] || "voteScore";

  return {
    categoryName: state.categoryFilter,
    categorySort: sortBy
  };
}
export default connect(mapStateToProps)(PostListHeaderSelect);
