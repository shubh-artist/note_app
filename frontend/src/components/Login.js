import React, { Component } from "react";
import Axios from "axios";
import apis from "./Api";
import http from "./Https";
import { Form, Input, Button, Checkbox,Card} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inview: "login page",
      login_email: "",
      login_password: "",
      register_email: "",
      register_password: "",
      register_user_name: ""
    };
  }

  login = () => {
    console.log(this.state.login_email);
    console.log(this.state.login_password);
    http.post("/login", {
      email: this.state.login_email,
      password: this.state.login_password
    })
      .then(result => {
        console.log(result.data);
        if (result.data.status) {
          this.props.login(result.data.token, "shubh");
        } else {
          alert(result.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  register = () => {
    http.post("/signup", {
      email: this.state.register_email,
      password: this.state.register_password,
      username: this.state.register_user_name
    })
      .then(result => {
        console.log(result.data);
        alert(result.data.message)
      })
      .catch(err => {
        console.log("Error" + err);
      });
  };

  render() {
    return (
      <div>
        {this.state.inview === "login page" ? (
          <div className="login-form-wrapper">
            <div className="login-form-inner">
              <Form name="normal_login" className="login-form" initialValues={{
                    remember: true,
                }} onFinish={this.login}
            >
              {/*Email zone*/}
              <Form.Item name="email" rules={[
                  {
                      required: true,
                      message: 'Please input your Email!',
                  },
                  {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                  },
                  ]}
              >
                  <Input 
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Email" 
                      onChange={e => {
                          this.setState({ login_email: e.target.value });
                      }}
                  />
              </Form.Item>
              
              {/* <input
                type="email"
                placeholder="Enter your email"
                onChange={e => {
                  this.setState({ login_email: e.target.value });
                }}
              /> */}
              
              {/*Password zone*/}
              <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
              >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={e => {
                    this.setState({ login_password: e.target.value });
                }}
                />
            </Form.Item>
              
              {/* <input
                type="password"
                placeholder="password"
                onChange={e => {
                  this.setState({ login_password: e.target.value });
                }}
              /> */}


              {/*Remember me section */}
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="/">
                Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                          <Button type="primary" htmlType="submit" className="login-form-button">
                          Log in
                          </Button >
                          Or
                          <Button type="primary" className="login-form-button" onClick={()=>{
                              this.setState({inview: "register page"});
                          }}>
                              Sign up
                          </Button>
              </Form.Item>
              {/* <button onClick={this.login}>Login</button>  
              <button onClick={() => {
                  this.setState({ inview: "register page" });
                }}
              >
                Go to sign up
              </button> */}
            </ Form>
            </div>  
          </div>
        ) : (
          <Card style={{marginLeft:'300px',marginRight:'300px'}}>
            <div style={{width:'50%',marginLeft:'25%'}}>
            <Form
              {...formItemLayout}
              name="register"
              onFinish={this.register}
            >
              <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input onChange={e => {
                  this.setState({ register_email: e.target.value });
                }}/>
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password onChange={e => {
                  this.setState({ register_password: e.target.value });
                }}/>
                </Form.Item>

              <Form.Item name="text" label="name" 
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
                hasFeedback
              >
                <Input onChange={e => {
                  this.setState({ register_user_name: e.target.value });
                }}/>
              </Form.Item>
              {/* <button onClick={this.register}>Sign up</button> */}
              <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>

              <Button type="primary" onClick={() => {
                  this.setState({ inview: "login page" });
                }}
              >
                Login
              </Button>
              </Form.Item>
            </Form>
          </div>
          </Card>
        )}
      </div>
    );
  }
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


export default Login;
