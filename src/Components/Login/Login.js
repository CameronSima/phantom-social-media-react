import React from 'react';
import Api from '../../utils/api';
import {connect} from 'react-redux';
import { login } from '../../redux/actions/User';


class Login extends React.Component {
  
  api = Api;
  state = {
    username: "",
    password: "",
    errorMessage: "",
    showModal: false
  }

  enterUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  enterPassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  submit = async () => {

    await this.props.login(this.state.username, this.state.password);
    if (this.props.isLoggedIn) {
      document.getElementById('closeModal').click();
    }
     
  }

  showModal = () => {
    this.setState({
      showModal: true
    });
  }

  render() {
    const buttonText = this.props.isLoggedIn ? this.props.account.username : "Login"

    return (
      <div>
      <div className="modal fade" id="modalLoginForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
              <button type="button" className="close" id="closeModal" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              <div className="md-form mb-5">
                <i className="fa fa-envelope prefix grey-text" />
                <input type="email" onChange={this.enterUsername} id="defaultForm-email" className="form-control validate" />
                <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">username</label>
              </div>
              <div className="md-form mb-4">
                <i className="fa fa-lock prefix grey-text" />
                <input type="password" onChange={this.enterPassword} id="defaultForm-pass" className="form-control validate" />
                <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">password</label>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
            <button onClick={this.submit} className="btn btn-success my-2 my-sm-0" >Login</button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
      <button data-toggle="modal" data-target="#modalLoginForm" className="btn btn-success my-2 my-sm-0" >{ buttonText }</button>
      </div>
    </div>
  )
  }
}

const mapStateToProps = state => (
  {...state.User }
)

const mapDispatchToProps = dispatch => ({
  login: async (username, password) => {
    const res = await login(username, password);
    res(dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)

