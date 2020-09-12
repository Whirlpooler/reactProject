import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

function getLastMsg(chatMsgs, userId) {
	const lastMsgObjs = {}
	chatMsgs.forEach(msg => {
		if (msg.to === userId && !msg.read) {
			msg.unReadCount = 1
		} else {
			msg.unReadCount = 0
		}
		const chat_id = msg.chat_id
		// let lastMsg = lastMsgObjs[chat_id]
		if (lastMsgObjs[chat_id]) { //有
			const unReadCount = lastMsgObjs[chat_id].unReadCount + msg.unReadCount
			if (lastMsgObjs[chat_id].create_time < msg.create_time) { //根据分组的时间，确定是一组中最新的一条数据
				lastMsgObjs[chat_id] = msg
			}
			lastMsgObjs[chat_id].unReadCount = unReadCount
		} else { // 无
			lastMsgObjs[chat_id] = msg
		}

	})
	let lastMsgArray = Object.values(lastMsgObjs)
	lastMsgArray.sort(function (m1, m2) {
		return m2.create_time - m1.create_time
	})
	return lastMsgArray

}
class Message extends Component {
	render() {
		console.log(this.props.msgList)
		const userId = this.props.user._id
		const { users, chatMsgs } = this.props.msgList
		const lastMsgArray = getLastMsg(chatMsgs, userId)
		console.log(33, lastMsgArray)
		return (
			<List style={{ marginTop: 50, marginBottom: 50 }}>
				{
					lastMsgArray.map(msg => {
						const targetUserId = msg.from === userId ? msg.to : msg.from
						return <Item
							extra={<Badge text={msg.unReadCount} />}
							thumb={users[targetUserId].header ? require(`../../asset/images/${users[targetUserId].header}.png`) : null}
							arrow='horizontal'
							key={msg.chat_id}
							onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
						>
							{msg.content}
							<Brief>{users[targetUserId].username}</Brief>
						</Item>
					})
				}

			</List>
		)
	}
}
export default connect((state) => ({ user: state.user, msgList: state.msgList }), {})(Message)
