import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import styled from 'styled-components';
import ApiContext from './ApiContext';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import Folder from './components/Folder/Folder';
import NotFound from './components/NotFound/NotFound';
import AddNote from './components/AddNote/AddNote';
import AddFolder from './components/AddFolder/AddFolder';

const API_URL = 'http://localhost:9090';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const [folders, notes] = await Promise.all([getFolders(), getNotes()]);
      return this.setState({ folders, notes, loading: false });
    } catch (err) {
      console.error(err);
    }

    async function getFolders() {
      try {
        const res = await fetch(`${API_URL}/folders`);
        const data = res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    }

    async function getNotes() {
      try {
        const res = await fetch(`${API_URL}/notes`);
        const data = res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  }

  handleDeleteNote = (noteId) => {
    const { notes } = this.state;
    return this.setState({
      notes: notes.filter((note) => note.id !== noteId)
    });
  };

  handleAddNote = (note) => {
    return this.setState({ notes: [...this.state.notes, note] });
  };

  handleAddFolder = (folder) => {
    return this.setState({ folders: [...this.state.folders, folder] });
  };

  render() {
    const { loading, notes, folders } = this.state;
    const { handleDeleteNote, handleAddNote, handleAddFolder } = this;

    return loading ? (
      <p>loading</p>
    ) : (
      <StyledDiv>
        <Router>
          <Header></Header>
          <ApiContext.Provider
            value={{
              notes,
              folders,
              deleteNote: handleDeleteNote,
              addNote: handleAddNote,
              addFolder: handleAddFolder
            }}
          >
            <Switch>
              <Route exact path='/' render={(props) => <Folder {...props} />} />
              <Route
                exact
                path='/folder/:folderId'
                render={(props) => <Folder {...props} />}
              />
              <Route
                exact
                path='/add-note'
                render={(props) => <AddNote {...props} />}
              />
              <Route
                exact
                path='/add-folder'
                render={(props) => <AddFolder {...props} />}
              />
              <Route
                exact
                path='/note/:noteId'
                render={(props) => <Note {...props} />}
              />
              <Route path='/404' component={NotFound} />
              <Redirect to='/404' />
            </Switch>
          </ApiContext.Provider>
        </Router>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  width: 92rem;
  margin: 0 auto;
`;

export default App;
