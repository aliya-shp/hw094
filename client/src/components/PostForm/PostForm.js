import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";

const PostForm = ({tags, onSubmit}) => {
  const [state, setState] = useState({
    text: '',
    image: '',
    tags: '[]',
  });
  const submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(state).forEach(key => {
      let value = state[key];
      formData.append(key, value);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const fileChangeHandler = event => {
    setState({
      ...state,
      [event.target.name]: event.target.files[0],
    })
  };

  const tagsChangeHandler = (e, tags) => {
    setState({...state, tags: JSON.stringify(tags)});
  };
  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <FormElement
            type="text"
            propertyName="text"
            title="Content"
            placeholder="Enter text"
            onChange={inputChangeHandler}
            value={state.text}
          />
        </Grid>
        <Grid item xs>
          <FormElement
            type="file"
            propertyName="image"
            title="Image"
            onChange={fileChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <FormElement
            propertyName="tags"
            title="Tags"
            onChange={tagsChangeHandler}
            type="tags"
            tags={tags}
            value={JSON.parse(state.tags)}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">Save</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;