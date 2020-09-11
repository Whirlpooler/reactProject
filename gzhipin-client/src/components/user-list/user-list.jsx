import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
const Header = Card.Header
const Body = Card.Body
export default class UserList extends Component {
	static propTypes = {
		userList: PropTypes.array,
	}
	render() {
		console.log(111, this.props.userList)
		return (
			<div style={{ marginTop: 50, marginBottom: 50 }}>
				{this.props.userList.map((user) => (
					<WingBlank key={user._id}>
						<Card>
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
