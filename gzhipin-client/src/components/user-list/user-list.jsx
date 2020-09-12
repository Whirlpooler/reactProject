import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
const Header = Card.Header
const Body = Card.Body
class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array,
    }
    render() {
        return (
            <div style={{ marginTop: 50, marginBottom: 50 }}>
                {this.props.userList.map((user) => (
                    <WingBlank key={user._id}>
                        <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                            <Header
                                thumb={require(`../../asset/images/${
                                    user.header || '头像1'
                                    }.png`)}
                                extra={user.username}
                            />
                            <Body>
                                <div>职位：{user.post}</div>
                                <div>公司：{user.company}</div>
                                {user.salary ? (
                                    <div>月薪：{user.salary}</div>
                                ) : null}
                                {user.info ? (
                                    <div>描述：{user.info}</div>
                                ) : null}
                            </Body>
                        </Card>
                        <WhiteSpace></WhiteSpace>
                    </WingBlank>
                ))}
            </div>
        )
    }
}

export default withRouter(UserList)
