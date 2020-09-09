// 应用主界面路由组件
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getRedirectTo } from '../../util/index'
import DaShenInfo from '../dashen-info/dashen-info'
import LanBanInfo from '../laoban-info/laoban-info'
class Main extends Component {
	render() {
		if (!this.props.user._id) {
			return <Redirect to="/login"></Redirect>
		}
		return (
			<React.Fragment>
				<Switch>
					<Route path="/dasheninfo" component={DaShenInfo}></Route>
					<Route path="/laobaninfo" component={LanBanInfo}></Route>
				</Switch>
			</React.Fragment>
		)
	}
}

export default connect((state) => ({ user: state.user }))(Main)
