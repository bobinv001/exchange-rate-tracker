import React from 'react';
import { Col, Card, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

import { ICurrencyComparison } from '../../types';

interface IProps extends ICurrencyComparison {
  amount: number;
  rate: number;
  result: number;
}

const CurrencyWithFlag: React.FC<{ currency: string }> = ({ currency }) => (
  <span className={`currency-flag currency-flag-${currency.toLowerCase()} currency-flag-lg`}></span>
);

const TrackCard: React.FC<IProps> = props => {
  const cardTitle = (
    <Space align="center">
      <CurrencyWithFlag currency={props.from} />
      {props.from} <ArrowRightOutlined /> {props.to}
      <CurrencyWithFlag currency={props.to} />
    </Space>
  );

  return (
    <Col span={8}>
      <Card bordered={false} title={cardTitle}>
        <Title level={4}>
          {props.amount} {props.from} = {props.result} {props.to}
        </Title>
        <div>Rate: {props.rate}</div>
      </Card>
    </Col>
  );
};

export default TrackCard;
