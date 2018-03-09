import React, {Component} from 'react';

import {connect} from 'react-redux'

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FaceIcon from 'material-ui-icons/Face';


class UserBar extends Component {
    render() {
        return (
            <div>
                <Chip
                    className="wld-userbar"
                    avatar={<Avatar><FaceIcon /></Avatar>}
                    label={`Hi ${this.props.userEmail}`}
                />
                <div style={{clear: 'both', height:0}}>&nbsp;</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userEmail: state.auth.user.email
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBar)