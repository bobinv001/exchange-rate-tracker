import React, { Fragment } from 'react';
import { Col, Card, Space, Button } from 'antd';
import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

import { ITracker } from '../../types';

import './index.scss';

interface IProps extends ITracker {
  amount: number;
  rate: number;
  removeTracker: (uuid: string) => void;
}

const CurrencyWithFlag: React.FC<{ currency: string }> = ({ currency }) => (
  <span className={`currency-flag currency-flag-${currency.toLowerCase()} currency-flag-lg`}></span>
);

const TrackCard: React.FC<IProps> = props => {
  const onRemoveClick = () => {
    props.removeTracker(props.uuid);
  };

  const cardTitle = (
    <Fragment>
      <Space align="center">
        <CurrencyWithFlag currency={props.from} />
        {props.from} <ArrowRightOutlined /> {props.to}
        <CurrencyWithFlag currency={props.to} />
      </Space>
      <Button type="dashed" icon={<CloseOutlined />} className="remove-button" onClick={onRemoveClick} />
    </Fragment>
  );

  return (
    <Col xs={24} xl={8} sm={12}>
      <Card bordered={false} title={cardTitle}>
        <Title level={4}>
          {props.amount} {props.from} = {props.amount * props.rate} {props.to}
        </Title>
        <div>Rate: {props.rate}</div>
      </Card>
    </Col>
  );
};

export default TrackCard;
