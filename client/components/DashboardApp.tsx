"use strict";
import * as React from 'react';
import { connect } from 'react-redux';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon
} from 'antd';
import InputForm from './InputForm';
import Chart from './Chart';
import {
  optinsFetch,
  optinsRecipientsEmpty,
  recipientsFetch
} from '../actions/index'

const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;
const SubMenu = Menu.SubMenu;

type TSwitchNames = 'showOptins' | 'showRecipients'

interface IDashboardAppProps {
  fetchOptins(object): void,
  fetchRecipients(object): void,
  emptyOptinsRecipients(): void
}

interface IDashboardAppState {
  collapsed: boolean,
  dateRange: any[],
  showOptins: boolean,
  showRecipients: boolean
}

require('antd/dist/antd.less');
class DashboardApp extends React.Component <IDashboardAppProps, IDashboardAppState> {
  state = {
    collapsed: false,
    dateRange: [],
    showOptins: true,
    showRecipients: true
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  }

  onDateChange = (dateMoment: [any?, any?]) => {
    this.setState({ dateRange: dateMoment }, () => {
      const dateFormat: string = 'YYYY-MM-DD';

      let [start, end]: [any?, any?] = dateMoment;

      if (start && end) {
        start = start.format(dateFormat);
        end = end.format(dateFormat);

        this.props.fetchOptins({ start, end });
        this.props.fetchRecipients({ start, end });
      } else {
        this.props.emptyOptinsRecipients();
      }
    });
  }

  onSwitchChange = (switchName: TSwitchNames, newValue: boolean) => {
    if (switchName === 'showOptins') {
      return this.setState({ showOptins: newValue })
    }

    if (switchName === 'showRecipients') {
      return this.setState({ showRecipients: newValue })
    }
  }

  render() {
    const inputFormValues = {
      dateRange: this.state.dateRange,
      showOptins: this.state.showOptins,
      showRecipients: this.state.showRecipients
    };

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
            <InputForm
              dateRange={this.state.dateRange}
              onDateChange={this.onDateChange}
              onSwitchChange={this.onSwitchChange}
              {...inputFormValues}
            />
            <Chart {...inputFormValues}/>
          </Content>
          <Footer style={styles.footer}>ShopMessage ©2018</Footer>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  breadcrumb: {
    margin: '16px 0'
  },
  content: {
    margin: '0 16px'
  },
  footer: {
    textAlign: 'center' as 'center'
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
};

const mapDispatchToProps = dispatch => ({
  fetchOptins: dateRange => dispatch(optinsFetch(dateRange)),
  fetchRecipients: dateRange => dispatch(recipientsFetch(dateRange)),
  emptyOptinsRecipients: () => dispatch(optinsRecipientsEmpty())
});

export default connect(null, mapDispatchToProps)(DashboardApp);