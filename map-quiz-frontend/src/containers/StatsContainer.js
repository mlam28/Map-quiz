import React, { Component } from "react";
import LeaderBoard from "./LeaderBoard.js";
import MyStats from "./MyStats.js";
import Deets from "./Deets.js";
import { Grid, Header } from "semantic-ui-react";
import FormContainer from "./FormContainer";

class StatsContainer extends Component {
  state = {
    games: [],
    gameForDeets: null
  };

  componentDidMount() {
    
    if (localStorage.getItem("token")) {
      fetch(`https://map-quiz-backend.herokuapp.com/token`, {headers: {"Authentication": `${localStorage.getItem("token")}`}})
        .then(resp => resp.json())
        .then(data => {console.log(data); this.setState({ games: data.games })});
    } else return null;
  }

  setGameForDeets = game => {
    if (this.state.gameForDeets === game) {
      this.setState({ gameForDeets: null });
    } else {
      this.setState({ gameForDeets: game });
    }
  };

  render() {
    console.log(this.state.games)
    return (
      <React.Fragment>
         <FormContainer
          hid={this.props.hid}
          setUser={this.props.setUser}
          closeForm={this.props.closeForm}
          toggleForm={this.props.toggleForm}
        />
      <Grid id="leader-grid">
        <Grid.Row columns={1}>
          <Header as="h1" textAlign="center">
            <Header.Content>Leaderboard</Header.Content>
          </Header>
          <Grid.Column>
            <LeaderBoard />
            {/* {this.props.user ? ( */}
          </Grid.Column>
         
        </Grid.Row>

        <Grid.Row columns={2}>
          <Header as="h1" textAlign="center">
            <Header.Content>My Stats</Header.Content>
          </Header>
          <Grid.Column>
            <Header as="h3" textAlign="center">
              <Header.Content>Games</Header.Content>
            </Header>
            <MyStats
              games={this.state.games}
              handleClick={this.setGameForDeets}
            />
          </Grid.Column>

          <Grid.Column>
            <Header as="h3" textAlign="center">
              <Header.Content>Questions</Header.Content>
            </Header>
            <Deets game={this.state.gameForDeets} />
          </Grid.Column>
        </Grid.Row>
        {/* ) : null} */}
      </Grid>
      </React.Fragment>
    );
  }
}

export default StatsContainer;
