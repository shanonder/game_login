import React , { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './Login.less';
import { Icon ,Input, Button , Select } from 'antd';


const Option = Select.Option;

class DebugLoginForm extends Component{
  constructor(props){
    super(props);
    this.datas = {
      "clients":[],
      "servers":[]
    };
    this.state = {
      username:localStorage.getItem('user')?localStorage.getItem('user'):"test" + Math.floor(Math.random() * 10000),
      password:"111111",
      client:"",
      server:""
    };
    fetch('/config.json')
      .then((res) => {return res.json(); })
      .then((data) => {
        this.datas = data ;
        this.setState({"client": data.clients[0].ip, "server":data.servers[0].ip});
      })
      .catch((e) => {console.log(e.message); });
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
          {this.datas.clients.map((data,index) => {
            return <Option value={data.ip}>{data.name}</Option>;
          })}
        </Select>
        <Select className={styles.item} style={{width:"100%"}} value={this.state.server} onSelect={(value)=>this.onSetSelect(value,"server")} >
          {this.datas.servers.map((data,index) => {
            return <Option value={data.ip}>{data.name}</Option>;
          })}
        </Select>
        <Button className={styles.item} style={{width:"100%"}} type={"primary"}  size={"large"}  onClick={this.onAction} >跳转</Button>
      </div>
    )
  }
}


export default DebugLoginForm;
