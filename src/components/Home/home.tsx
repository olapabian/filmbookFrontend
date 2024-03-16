import React, { Component } from "react";
import { getUserInfo } from "../../Helpers/axios_helper";

interface State {
  user: { username: string } | null;
}

class Home extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    getUserInfo()
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        this.setState({ user: null });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>Welcome to Filmbook!</h1>
        {user && (
          <div>
            <h2>User Information</h2>
            <p>Username: {user.username}</p>
          </div>
        )}
        {!user && <p>Loading...</p>}
      </div>
    );
  }
}

export default Home;
