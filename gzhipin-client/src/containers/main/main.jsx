// 应用主界面路由组件
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import DaShenInfo from '../dashen-info/dashen-info'
import LanBanInfo from '../laoban-info/laoban-info'
export default class Main extends Component {
    render() {
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
