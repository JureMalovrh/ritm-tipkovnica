import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form className="col-md-offset-4 col-md-4">
        <div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Username" />
          </div>
        </div>
        <div>
          <div className="col-md-4">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
        </div>
       
        <div>
          <div className="col-md-4">
            <button type="submit" onClick={this.loginUser.bind(this)} className="btn btn-primary">Sign in</button>
          </div>
        </div>
      </form>
    );
  }

  loginUser() {
    /* TODO: add request, axios or smthing */
    this.props.history.push('/menu');
  }
}

export default Login;