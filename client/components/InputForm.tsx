import React from 'react';
import {
  Card,
  Col,
  DatePicker,
  Row,
  Switch
} from 'antd';

const { RangePicker } = DatePicker

interface IInputFormProps {
  dateRange: any[],
  onDateChange([object]): void,
  onSwitchChange(string, boolean): void,
  showOptins: boolean,
  showRecipients: boolean
}

interface IField {
  label: string,
  input: object
}

const InputForm = (props: IInputFormProps) => {
  const FIELDS: IField[] = [
    {
      label: 'Date Range',
      input: <RangePicker onChange={props.onDateChange} value={props.dateRange} />
    },
    {
      label: 'Show Optins',
      input: 
        <Switch
          checked={props.showOptins}
          defaultChecked
          onChange={val => props.onSwitchChange('showOptins', val)}
        />
    },
    {
      label: 'Show Recipients',
      input:
        <Switch
          checked={props.showRecipients}
          defaultChecked
          onChange={val => props.onSwitchChange('showRecipients', val)}
        />
    },
  ];

  return (
    <Card style={styles.card}>
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
    </Card>
  );
}

const styles = {
  card: {
    margin: '0 0 10px'
  },
  fieldRow: {
    alignItems: 'center',
    padding: '10px 0'
  },
  labelCol: {
    textAlign: 'right' as 'right'
  }
};

export default InputForm;