import React, { PureComponent } from 'react';
import ChartJS from 'chart.js'

export default class Chart extends PureComponent <{}> {
  state = {
    chart: null
  }

  async componentDidMount() {
    const optins = await this.getOptIns()
    const recipients = await this.getRecipients()

    new ChartJS(this.refs.chart, {
      type: 'line',
      data: {
          labels: optins.map(item => item.date),
          datasets: [
            {
              label: 'opt-ins',
              data: optins.map(item => item.count),
              backgroundColor: colors.blue,
              borderColor: colors.blue,
              borderWidth: 1,
              fill: false
            },
            {
              label: 'recipients',
              data: recipients.map(item => item.count),
              backgroundColor: colors.red,
              borderColor: colors.red,
              borderWidth: 1,
              fill: false
            },
          ]
      }
    });
  }

  async getOptIns() {
    try {
      const rawOptins = await fetch('/api/reports/optins.json?from=2018-10-01&to=2018-11-01')
      const optins = await rawOptins.json()

      return optins
    } catch(ex) {
      console.error(ex)
      return null
    }
  }

  async getRecipients() {
    try {
      const rawRecipients = await fetch('/api/reports/recipients.json?from=2018-10-01&to=2018-11-01')
      const recipients = await rawRecipients.json()

      return recipients
    } catch(ex) {
      console.error(ex)
      return null
    }
  }

  render() {
    return (
      <div style={styles.chartContainer}>
        <canvas ref="chart"></canvas>
      </div>
    );
  }
}

const styles = {
  chartContainer: {
    height: '100%',
    position: 'relative' as 'relative',
    width: '100%'
  }
}

const colors = {
  blue: 'rgb(54, 162, 235)',
  red: 'rgb(255, 99, 132)'
}