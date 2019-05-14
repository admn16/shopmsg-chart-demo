import React, { PureComponent } from 'react';
import {
  Col,
  DatePicker,
  Row,
  Switch
} from 'antd';

const { RangePicker } = DatePicker

interface field {
  label: string,
  input: object
}

export default class InputForm extends PureComponent <{}> {
  onDateChange = (dateMoment, dateStr: [string, string]) => {
    console.log(dateMoment, dateStr)
  }

  onOptinsChange = (checked: boolean) => {
    console.log(checked)
  }

  onRecipientsChange = (checked: boolean) => {
    console.log(checked)
  }

  render() {
    const FIELDS: field[] = [
      {
        label: 'Date Range',
        input: <RangePicker onChange={this.onDateChange} />
      },
      {
        label: 'Show Optins',
        input: <Switch defaultChecked onChange={this.onOptinsChange} />
      },
      {
        label: 'Show Recipients',
        input: <Switch defaultChecked onChange={this.onOptinsChange} />
      },
    ]

    return (
      <form>
        {
          FIELDS.map(field => (
            <Row 
              gutter={16}
              key={field.label}
              style={styles.fieldRow}
              type="flex"
            >
              <Col span={6} style={styles.labelCol}>
                { field.label }:
              </Col>
              <Col span={18}>
                { field.input }
              </Col>
            </Row>
          ))
        }
      </form>
    );
  }
}

const styles = {
  fieldRow: {
    alignItems: 'center',
    padding: '10px 0'
  },
  labelCol: {
    textAlign: 'right' as 'right'
  }
}