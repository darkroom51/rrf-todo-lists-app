import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const styles = {
    container: {
        width: '100%',
        height: '100%',
    },
    item: {
        margin: '5%',
        padding: '5%',
        textAlign: 'center'
    },
    input: {
        width: '100%',
        marginBottom: '10px'
    },
    button: {
        margin: '10px'
    }
}

const LogIn = (props) => (
    <div style={styles.container}>
        <Paper style={styles.item}>
            <h2>
                Sign In!
            </h2>
            <span>with</span>
            <TextField
                name="email"
                placeholder={'E-mail'}
                type="email"
                style={styles.input}
                onChange={props.onEmailChange}
            />
            <TextField
                name="password"
                placeholder={'Password'}
                type="password"
                style={styles.input}
                onChange={props.onPasswordChange}
            />
            <Button
                variant={"raised"}
                color={"primary"}
                style={styles.button}
                onClick={props.onLogInClick}
            >
                Sign in
            </Button>

            <Button
                variant={"raised"}
                color={"secondary"}
                style={styles.button}
                onClick={props.onLogInByGoogleClick}
            >
                Google
            </Button>

            <Button
                variant={"raised"}
                color={"secondary"}
                style={styles.button}
                //onClick={props.onLogInByFacebookClick}  //TODO FB auth
                onClick={()=>{alert('Sorry, FB Auth not done yet. Use Sign Up/Login with email or login with Google.')}}
            >
                Facebook
            </Button>
        </Paper>
    </div>
)

export default LogIn