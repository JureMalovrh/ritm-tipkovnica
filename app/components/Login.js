import React from 'react';

class Login extends React.Component {
  render() {
    return (

      <form className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="form-group">
         <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" onClick={this.loginUser.bind(this)} className="btn btn-primary">Sign in</button>
      </form>
    );
  }

  loginUser() {
    /* TODO: add request, axios or smthing */
    this.props.history.push('/menu');
  }
}

export default Login;