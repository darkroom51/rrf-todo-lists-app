import React from 'react'
import moment from 'moment'

import {connect} from 'react-redux'

const LogInLogList  = (props) => (
    <div>
        {
            props.loginLogsList
            &&
            Object.entries(props.loginLogsList || {})
                .map(
                    ([key, value]) => (
            <div key={key}>{key} : {moment(value.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</div>
            ))
        }
    </div>
)


const mapStateToProps = state => ({
    loginLogsList: state.auth.loginLogs
})

export default connect(
    mapStateToProps
)(LogInLogList)