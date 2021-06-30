import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import { userActions } from "../actions/user.actions";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveShow = this.saveShow.bind(this);
    this.newShow = this.newShow.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false,
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
      return (e) => this.props.deleteUser(id);
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveShow() {
    const { title, description } = this.state;

    this.props
      .createShow(title, description)
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newShow() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="row mt-5">
      { user && user.userType === "administrator" ?
       <div>
        <div className="col-md-12 col-md-offset-3 mt-3">
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName + ' ' } 
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <Link onClick={this.handleDeleteUser(user.id)} >
                                    Delete
                                  </Link>
                            }
                        </li>
                    )}
                </ul>
            }
        </div>
      </div>
  : <Redirect to={{ pathname: '/' }} /> }
    </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
}

export default connect(mapState, actionCreators)(Admin);

// export default connect(null, { createShow })(Admin);
