import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
const Item = TabBar.Item

class FooterBar extends Component {
	render() {
		const path = this.props.location.pathname
		let navList = this.props.navList.filter((value) => !value.hidden)
		return (
			<TabBar tabBarPosition="bottom">
				{navList.map((value) => (
					<Item
						key={value.path}
						title={value.text}
						icon={{ uri: require(`./images/${value.icon}.png`) }}
						selectedIcon={{
							uri: require(`./images/${value.icon}-selected.png`),
						}}
						selected={value.path === path}
						onPress={() => this.props.history.replace(value.path)}
					></Item>
				))}
			</TabBar>
		)
	}
}

export default withRouter(FooterBar)
