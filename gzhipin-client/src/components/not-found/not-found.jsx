import React, { Component } from 'react'
import { Button } from 'antd-mobile'
export default class NotFound extends Component {
	render() {
		return (
			<div>
				<Button onClick={() => this.props.history.replace('/')}>
					回到首页
				</Button>
			</div>
		)
	}
}
