import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import { connect } from 'react-redux'
class LaoBanInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            header: '',
            post: '',
            company: '',
            salary: '',
            info: ''
        }
    }
    save = () => {
        console.info(this.state)
    }
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector changeHeader={(value) => this.handleChange('header', value)}></HeaderSelector>
                <InputItem placeholder="请输入招聘职位" onChange={(value) => this.handleChange('post', value)}>招聘职位：</InputItem>
                <InputItem placeholder="请输入公司名称" onChange={(value) => this.handleChange('company', value)}>公司名称：</InputItem>
                <InputItem placeholder="请输入职位薪资" onChange={(value) => this.handleChange('salary', value)}>职位薪资：</InputItem>
                <TextareaItem title="职位要求：" rows={3} onChange={(value) => this.handleChange('info', value)} ></TextareaItem>
                <Button type="primary" onClick={this.save} >保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(LaoBanInfo)