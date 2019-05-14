"use strict";
import * as React from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Card
} from 'antd';
import InputForm from './InputForm';
import Chart from './Chart';

const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;
const SubMenu = Menu.SubMenu;

require('antd/dist/antd.less');
export default class DashboardApp extends React.Component <{}> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={styles.layout}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Reports</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={styles.header}>
            Reports
          </Header>
          <Content style={styles.content}>
            <Breadcrumb style={styles.breadcrumb}>
              <Breadcrumb.Item>Reports</Breadcrumb.Item>
              <Breadcrumb.Item>Message Receipts & Optins</Breadcrumb.Item>
            </Breadcrumb>
            <Card style={styles.cardInputForm}>
              <InputForm/>
            </Card>

            <Card>
              <Chart/>
            </Card>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ShopMessage ©2018</Footer>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  breadcrumb: {
    margin: '16px 0'
  },
  cardInputForm: {
    margin: '0 0 10px'
  },
  content: {
    margin: '0 16px'
  },
  header: {
    background: '#fff',
    fontSize: '24px',
    fontWeight: 500,
    padding: '0 16px'
  },
  layout: {
    minHeight: '100vh'
  }
}