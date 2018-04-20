import React , { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './Login.less';
import { Icon ,Input, Button , Select } from 'antd';

const Option = Select.Option;

class DebugLoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      username:localStorage.getItem('user')?localStorage.getItem('user'):"test" + Math.floor(Math.random() * 10000),
      password:"111111",
      client:"192.168.1.195",
      server:"192.168.1.195"
    };
  }

  randonName = ()=> {
    this.setState({username:"test" + Math.floor(Math.random() * 10000)});
    return this.state.username;
  }

  onSetProp = ( e ,param)=> {
    let data = {};
    data[param] = e.target.value;
    this.setState(data);
  }

  onSetSelect = (value , param) =>{
    let data = {};
    data[param] = value;
    this.setState(data);
  }

  onAction = ()=>{
    if(this.state.username){
      localStorage.setItem('user',this.state.username);
      window.location.href = "http://"+this.state.client + "?user=" + this.state.username +
        "&host=" + this.state.server;
    }
  }

  render(){
    return (
      <div className={styles.main}>
        <Input  value={this.state.username} onChange={(e)=>this.onSetProp(e,"username")} addonAfter={<Icon type="setting" onClick={this.randonName}/>}/>
        <Input className={styles.item} value={this.state.password} type="password" onChange={(e)=>this.onSetProp(e,"password")} />
        <Select className={styles.item} style={{width:"100%"}} value={this.state.client} onSelect={(value)=>this.onSetSelect(value,"client")} >
          <Option value="192.168.1.195">主线195</Option>
          <Option value="192.168.1.130:8090">前端（朱）</Option>
        </Select>
        <Select className={styles.item} style={{width:"100%"}} value={this.state.server} onSelect={(value)=>this.onSetSelect(value,"server")} >
          <Option value="192.168.1.195">主线195</Option>
          <Option value="192.168.1.196">后端（牟）</Option>
          <Option value="192.168.1.11">后端（郭）</Option>
        </Select>
        <Button className={styles.item} style={{width:"100%"}} type={"primary"}  size={"large"}  onClick={this.onAction} >跳转</Button>
      </div>
    )
  }
}


export default DebugLoginForm;
