import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'
import { sendMsg, readMsg } from '../../redux/actions'
const Item = List.Item
class Chat extends Component {
    constructor(props) {
        super(props)
        const arrayEmoji = ['😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
            '😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉',
        ]
        this.dataEmoji = arrayEmoji.map(icon => {
            return { text: '微笑', icon }
        })
        this.state = {
            content: '',
            showEmoji: false,
            gridHeight: 50
        }
    }
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount(){
        if(this.props.msgList.unReadCount>0){
            const from = this.props.match.params.userId
            const to = this.props.user._id
            this.props.readMsg(from, to)
        }
    }
    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userId
        const content = this.state.content.trim()
        if (content) {
            this.props.sendMsg({ from, to, content })
        }
        this.setState({
            content: '',
            showEmoji: false,
            gridHeight: 50
        })
    }
    toggleShow = () => {
        const showEmoji = !this.state.showEmoji
        this.setState({ showEmoji })
        if (showEmoji) {
            this.setState({ showEmoji, gridHeight: 235 })
            window.scrollTo(0, document.body.scrollHeight)
            setInterval(() => {
                window.dispatchEvent(new Event('resize'))
            }, 10)
        } else {
            this.setState({ showEmoji, gridHeight: 50 })
        }
    }
    render() {
        const { chatMsgs, users } = this.props.msgList
        const meId = this.props.user._id
        if (!users[meId]) {
            return null
        }
        const targetId = this.props.match.params.userId
        const targetIcon = users[targetId].header
        const targetUsername = users[targetId].username
        const thumb = targetIcon ? require(`../../asset/images/${targetIcon}.png`) : null
        const chatId = [meId, targetId].sort().join('-')
        const newChatMsgs = chatMsgs.filter(value => value.chat_id === chatId)
        return (
            <div id="chat-page">
                <NavBar icon={<Icon type='left' />} className="sticky-header" onLeftClick={() => this.props.history.goBack()}>{targetUsername}</NavBar>

                <List style={{ marginTop: 50, marginBottom: this.state.gridHeight }}>
                <QueueAnim   >
                    {
                        newChatMsgs.map((value, index) => {
                            if (value.from === meId) {
                                return <Item extra='我' className='chat-me' key={index} wrap={true}  >
                                    {value.content}
                                </Item>
                            } else {
                                return <Item thumb={thumb} key={index} wrap={true} >
                                    {value.content}
                                </Item>
                            }
                        })
                    }
                </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder="请输入" value={this.state.content} onFocus={() => this.setState({ showEmoji: false, gridHeight: 50 })} onChange={val => this.setState({ content: val })} extra={<span><span onClick={this.toggleShow}>😀</span><span onClick={this.handleSend}>发送</span></span>}>
                    </InputItem>
                    {
                        this.state.showEmoji ? (
                            <Grid id="emoji"
                                isCarousel={true}
                                data={this.dataEmoji}
                                onClick={(el, index) => {
                                    const oldContent = this.state.content
                                    this.setState({ content: oldContent + el.icon })
                                }}
                                columnNum={8}
                                carouselMaxRow={4}
                                renderItem={(el, index) => (
                                    <span className="icon-emoji">{el.icon}</span>
                                )}
                            />
                        ) : null
                    }

                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ msgList: state.msgList, user: state.user }),
    { sendMsg, readMsg }
)(Chat)
