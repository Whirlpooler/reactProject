// 登录组件
import React, { Component } from 'react'
import {
	NavBar,
	WingBlank,
	List,
	InputItem,
	WhiteSpace,
	Button,
	Toast
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'
import Logo from '../../components/logo/logo'
class Login extends Component {
	state = {
		username: '', //用户名
		password: '', //密码
	}
	login = () => {
		// console.log(this.state)
		this.props.login(this.state)
	}
	handleChange = (name, val) => {
		this.setState({
			[name]: val,
		})
	}
	toRegister = () => {
		this.props.history.replace('/register')
	}
	render() {
		const { msg, redirectTo } = this.props
		if (msg) {
			Toast.fail(msg, 3)
		}
		if (redirectTo) {
			return <Redirect to={redirectTo}></Redirect>
		}
		return (
			<div>
				<NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
				<Logo></Logo>
				<WingBlank>
					<List>
						<WhiteSpace></WhiteSpace>
						<InputItem
							onChange={(val) =>
								this.handleChange('username', val)
							}
							placeholder="请输入用户名"
						>
							用户名：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem
							onChange={(val) =>
								this.handleChange('password', val)
							}
							placeholder="请输入密码"
							type="password"
						>
							密&nbsp;&nbsp;&nbsp;码：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<Button type="primary" onClick={this.login}>
							登录
						</Button>
						<WhiteSpace></WhiteSpace>
						<Button onClick={this.toRegister}>还没有账号</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}

export default connect(
	state => state.user,
	{ login }
)(Login)
