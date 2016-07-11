import React from 'react';
import { connect } from 'react-redux';
import UserList from '../views/userList';
import * as userApi from '../../api/userApi';
import store from '../../store';
import { loadSearchLayout } from '../../actions/searchLayoutActions';

const UserListContainer = React.createClass({

  componentDidMount: function() {
    userApi.getUsers();
    store.dispatch(loadSearchLayout('users', 'User Results'));
  },

  render: function() {
    return (
      <UserList users={this.props.users} deleteUser={userApi.deleteUser} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    users: store.userState.users
  };
};

export default connect(mapStateToProps)(UserListContainer);
