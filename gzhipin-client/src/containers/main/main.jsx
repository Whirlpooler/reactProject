// 应用主界面路由组件
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Route, Switch, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUser } from '../../redux/actions'
import { getRedirectTo } from '../../util/index'
import DaShenInfo from '../dashen-info/dashen-info'
import LanBanInfo from '../laoban-info/laoban-info'
import Message from '../message/message'
import Personal from '../personal/personal'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import NotFound from '../../components/not-found/not-found'
import FooterBar from '../../components/footer-bar/footer-bar'
class Main extends Component {
	navList = [
		{
			title: '大神列表',
			component: Dashen,
			path: '/dashen',
			icon: 'dashen',
			text: '大神',
		},
		{
			title: '老板列表',
			component: Laoban,
			path: '/laoban',
			icon: 'laoban',
			text: '老板',
		},
		{
			title: '消息列表',
			component: Message,
			path: '/message',
			icon: 'message',
			text: '消息',
		},
		{
			title: '个人中心',
			component: Personal,
			path: '/personal',
			icon: 'personal',
			text: '我的',
		},
	]
	componentDidMount() {
		const userId = Cookies.get('userId')
		const { user } = this.props
		if (userId && !user._id) {
			this.props.getUser()
		}
	}
	render() {
		const userId = Cookies.get('userId')
		if (userId) {
			const { user } = this.props
			if (!user._id) {
				return null
			} else {
				let path = this.props.location.pathname
				if (path === '/') {
					path = getRedirectTo(user.type, user.header)
					return <Redirect to={path}></Redirect>
				}
			}
		} else {
			return <Redirect to="/login"></Redirect>
		}
		const path = this.props.location.pathname
		const NavObj = this.navList.find((nav) => nav.path === path)
		if (NavObj) {
			if (this.props.user.type === 'laoban') {
				this.navList[1].hidden = true
			} else {
				this.navList[0].hidden = true
			}
		}

		return (
			<React.Fragment>
				{NavObj ? <NavBar>{NavObj.title}</NavBar> : null}
				<Switch>
					{this.navList.map((value) => (
						<Route
							key={value.path}
							path={value.path}
							component={value.component}
						></Route>
					))}
					<Route path="/dasheninfo" component={DaShenInfo}></Route>
					<Route path="/laobaninfo" component={LanBanInfo}></Route>
					<Route component={NotFound}></Route>
				</Switch>
				{NavObj ? <FooterBar navList={this.navList}></FooterBar> : null}
			</React.Fragment>
		)
	}
}

export default connect((state) => ({ user: state.user }), { getUser })(Main)
