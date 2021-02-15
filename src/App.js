import Container from "@material-ui/core/Container";
import { Provider } from "react-redux";
import "./App.css";
import Member from "./member/Member";
import { fetchEvents, fetchMembers } from "./redux/ActionTypes";
import store from "./redux/reducers";

function App() {
  store.dispatch(fetchMembers());
  store.dispatch(fetchEvents());
  console.log(store.getState());
  return (
    <Provider store={store}>
      <Container>
        <div className="App">
          <Member />

          
        </div>
      </Container>
    </Provider>
  );
}

export default App;
