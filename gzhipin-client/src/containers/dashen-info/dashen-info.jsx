import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUserAsync } from '../../redux/actions'
class DaShenInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			header: '',
			post: '',
			info: '',
		}
		// this.save = this.save.bind(this)
	}
	handleChange = (name, value) => {
		this.setState({
			[name]: value,
		})
	}
	save = () => {
		// console.log(this.state)
		if (!this.state.header) {
			Toast.fail('请选择头像')
			return
		}
		this.props.updateUserAsync(this.state)
	}
	render() {
		if (this.props.user.header) {
			return <Redirect to="/dashen"></Redirect>
		}
		return (
			<div>
				<NavBar>大神信息完善</NavBar>
				<HeaderSelector
					changeHeader={(value) => this.handleChange('header', value)}
				></HeaderSelector>
				<InputItem
					placeholder="请输入求职岗位"
					onChange={(value) => this.handleChange('post', value)}
				>
					求职岗位：
				</InputItem>
				<TextareaItem
					title="个人介绍："
					rows={3}
					onChange={(value) => this.handleChange('info', value)}
				></TextareaItem>
				<Button type="primary" onClick={this.save}>
					保存
				</Button>
			</div>
		)
	}
}

export default connect((state) => ({ user: state.user }), { updateUserAsync })(
	DaShenInfo
)
