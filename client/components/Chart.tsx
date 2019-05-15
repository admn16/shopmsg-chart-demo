import React from 'react';
import { connect } from 'react-redux';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, Spin } from 'antd';

interface IChartProps {
  dateRange: any[],
  isFetchingData: boolean,
  optins: any[],
  recipients: any[],
  showOptins: boolean,
  showRecipients: boolean
}

const Chart = (props: IChartProps) => {
  const {
    optins,
    recipients,
    showOptins,
    showRecipients
  } = props;

  const dataNames = (optins || recipients).map(item => ({ name: item.date }));

  const data = dataNames.map((name, i) => ({
    ...name,
    ...(optins && optins[i] && { optin: optins[i].count }),
    ...(recipients && recipients[i] && { recipient: recipients[i].count })
  }));

  const showChart = data.length > 0 && (showOptins || showRecipients)
  const hasNoResults = props.dateRange.length > 0
    && data.length === 0
    && !props.isFetchingData;

  return (
    <Spin size="large" spinning={props.isFetchingData}>
      <Card>
        {
          showChart && (
            <ResponsiveContainer height={400}>
              <LineChart
                width={500}
                height={300}
                data={data}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                { showOptins && <Line type="monotone" dataKey="optin" stroke={colors.blue} /> }
                { showRecipients && <Line type="monotone" dataKey="recipient" stroke={colors.red} /> }
              </LineChart>
            </ResponsiveContainer>
          )
        }

        {
          hasNoResults && 'No results to display'
        }
      </Card>
    </Spin>
  );
}

const colors = {
  blue: '#36a2eb',
  red: '#ff6384'
};

const mapStateToProps = state => ({
  isFetchingData: state.isFetchingData,
  optins: state.optins,
  recipients: state.recipients,
});

export default connect(mapStateToProps)(Chart);