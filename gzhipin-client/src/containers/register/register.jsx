// 注册组件
import React, { Component } from 'react'
import {
	NavBar,
	WingBlank,
	List,
	InputItem,
	WhiteSpace,
	Radio,
	Button,
	Toast
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'
class Register extends Component {
	state = {
		username: '', //用户名
		password: '', //密码
		password2: '', //确认密码
		type: 'dashen', //用户类型，laoban,dashen
	}
	register = () => {
		// console.log(this.state)
		this.props.register(this.state)
	}
	handleChange = (name, val) => {
		this.setState({
			[name]: val,
		})
	}
	toLogin = () => {
		this.props.history.replace('/login')
	}
	componentDidUpdate() {

	}
	render() {
		const { type } = this.state
		const { msg, redirectTo } = this.props.user
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
						<InputItem
							onChange={(val) =>
								this.handleChange('password2', val)
							}
							placeholder="确认密码"
							type="password"
						>
							确认密码：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<List.Item>
							用户类型： &nbsp;&nbsp;
							<Radio
								checked={type === 'dashen'}
								onChange={() =>
									this.handleChange('type', 'dashen')
								}
							>
								大神
							</Radio>
							&nbsp;&nbsp;
							<Radio
								checked={type === 'laoban'}
								onChange={() =>
									this.handleChange('type', 'laoban')
								}
							>
								老板
							</Radio>
						</List.Item>
						<WhiteSpace></WhiteSpace>
						<Button type="primary" onClick={this.register}>
							注册
						</Button>
						<WhiteSpace></WhiteSpace>
						<Button onClick={this.toLogin}>已有账号</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}

export default connect(
	state => ({ user: state.user }),
	{ register }
)(Register)
