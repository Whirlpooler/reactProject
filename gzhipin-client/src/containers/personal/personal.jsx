import React, { Component } from 'react'
import { Result, Button, List, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert
class Personal extends Component {
	logout = () => {
		alert('退出', '确认退出登录吗?', [
			{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
			{
				text: '退出', onPress: () => {
					Cookies.remove('userId')
					this.props.resetUser()
				}
			},
		])
	}
	render() {
		const { header, username, company, post, info, salary } = this.props.user
		return <div>
			<Result
				img={<img src={require(`../../asset/images/${header}.png`)} />}
				title={username}
				message={company}
			/>
			<List renderHeader="相关信息">
				<Item multipleLine>
					<Brief>职位：{post}</Brief>
					<Brief>简介：{info}</Brief>
					{salary ? <Brief>薪资：{salary}</Brief> : null}
				</Item>
			</List>
			<WhiteSpace></WhiteSpace>
			<Button type="warning" onClick={this.logout}>
				退出登录
			</Button>
		</div>
	}
}
export default connect((state) => ({ user: state.user }), { resetUser })(Personal)
