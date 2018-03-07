import React from 'react'

import LogIn from './LogIn'
import SignUp from './SignUp'

import {connect} from 'react-redux'
import {logIn, signUp, logInWithGoogle} from '../../state/auth'

class Forms extends React.Component {
    state = {
        loginEmail: '',
        loginPassword: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpRetypePassword: ''
    }


    handleLoginEmail = (e) => {this.setState({loginEmail: e.target.value})}
    handleLoginPassword = (e) => {this.setState({loginPassword: e.target.value})}
    handleSignUpEmail = (e) => {this.setState({signUpEmail: e.target.value})}
    handleSignUpPassword = (e) => {this.setState({signUpPassword: e.target.value})}


    render() {
        return (
                <div>
                    <LogIn
                        onEmailChange={this.handleLoginEmail}
                        onPasswordChange={this.handleLoginPassword}
                        onLogInClick={() => this.props.onLogInClick(
                            this.state.loginEmail,
                            this.state.loginPassword
                        )}
                        onLogInByGoogleClick={() => this.props.onLogInByGoogleClick()}
                    />
                    <SignUp
                        onEmailChange={this.handleSignUpEmail}
                        onPasswordChange={this.handleSignUpPassword}
                        onRetypePasswordChange={()=>{}}
                        onSignUpClick={() => this.props.onSignUpClick(
                            this.state.signUpEmail,
                            this.state.signUpPassword
                        )}
                    />
                </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onLogInClick: (email, password) => dispatch(logIn(email, password)),
    onSignUpClick: (email, password) => dispatch(signUp(email, password)),
    onLogInByGoogleClick: () => dispatch(logInWithGoogle())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forms)