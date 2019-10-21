import React, { Component } from "react";
import Leader from "../components/Leader.js";
import { Container, Grid } from "semantic-ui-react";

class LeaderBoard extends Component {
  state = {
    leaders: []
  };

  componentDidMount() {
    fetch("https://map-quiz-backend.herokuapp.com/topten")
      .then(resp => resp.json())
      .then(data => this.setState({ leaders: data }));
  }

  render() {
    return (
      <Container className="stat-section">
        <Grid divided="vertically">
          <Grid.Row columns={3}>
            {this.state.leaders.map((game, index) => (
              <Leader game={game} key={game.id} index={index + 1} />
            ))}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default LeaderBoard;
