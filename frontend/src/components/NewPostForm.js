import React from "react";
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
import "./App.css";
import { createPost } from "../utils/api";
import { createId } from "../utils/helpers";
import { addPost, closeNewPostForm } from "../actions";
import Button from "./common/Button";
import LabelledTextInput from "./common/LabelledTextInput";

const FormikForm = ({ values }) => (
  <Form className="NewPostForm">
    <LabelledTextInput name="author" type="text" label="Seu nome:" />
    <LabelledTextInput name="title" type="text" label="Titulo:" />
    <label>
      Texto:
      <Field component="textarea" name="body" />
    </label>
    <label>
      Categoria:
      <Field component="select" name="category">
        {values.categories.map(category => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </Field>
    </label>
    <Button text="Adicionar Post" />
  </Form>
);

const NewPostForm = withFormik({
  mapPropsToValues({ categories }) {
    return {
      author: "",
      title: "",
      body: "",
      category: categories[0].name,
      categories: categories
    };
  },

  handleSubmit(values, { props }) {
    createPost({
      id: createId(),
      timestamp: Date.now(),
      author: values.author,
      title: values.title,
      body: values.body,
      category: values.category
    }).then(post => {
      props.dispatch(addPost(post));
      props.dispatch(closeNewPostForm());
    });
  }
})(FormikForm);

function mapStateToProps(state) {
  const categories = Object.keys(state.categories).map(
    category_key => state.categories[category_key]
  );

  return {
    categories: categories
  };
}

export default connect(mapStateToProps)(NewPostForm);
