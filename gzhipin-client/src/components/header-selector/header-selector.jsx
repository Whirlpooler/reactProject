import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderSelector extends Component {
  static propTypes = {
    changeHeader: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.headerList = []
    this.state = {
      icon: ''
    }
    for (let index = 0; index < 20; index++) {
      this.headerList.push({
        text: `头像${index + 1}`,
        icon: require(`./images/头像${index + 1}.png`)
      })
    }
  }
  selectHeader = el => {
    this.setState({
      icon: el.icon
    })
    this.props.changeHeader(el.text)
  }
  render () {
    const headerShow = () => {
      return !this.state.icon ? (
        '请选择头像'
      ) : (
        <div>
          <img src={this.state.icon} alt='' />
        </div>
      )
    }
    return (
      <div>
        <List renderHeader={headerShow}>
          <Grid
            activeClassName='activeHeader'
            data={this.headerList}
            columnNum={5}
            onClick={el => this.selectHeader(el)}
          >
            {' '}
          </Grid>
        </List>
      </div>
    )
  }
}
