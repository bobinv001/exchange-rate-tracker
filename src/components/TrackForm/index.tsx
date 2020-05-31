import React from 'react';
import { Form, Button, Card, Select, Input, Space } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

import { ICurrencyComparison, ComparisonKeys } from '../../types';

import './index.scss';

const { Option } = Select;

// TODO extend to include other base currencies
const DEFAULT_BASE_CURRENCY = 'EUR';

const DEFAULT_COMPARISON = {
  from: DEFAULT_BASE_CURRENCY,
  to: '',
};

interface IProps {
  trackNewRate: (comparison: ICurrencyComparison, amount: number) => Promise<void>;
  allCurrencies: { [key: string]: string };
}

const TrackForm: React.FC<IProps> = props => {
  const [currenciesComparison, setCurrenciesComparison] = React.useState<ICurrencyComparison>(DEFAULT_COMPARISON);

  const [amount, setAmount] = React.useState(1);

  const onCurrencyChange = (comparisonKey: ComparisonKeys) => (newCurrency: string) => {
    setCurrenciesComparison({
      ...currenciesComparison,
      [comparisonKey]: newCurrency,
    });
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const parsedValue = parseInt(e.target.value, 10);

    if (Number.isNaN(parsedValue)) {
      return;
    }
    setAmount(parsedValue);
  };

  const trackNewFx = () => {
    props.trackNewRate(currenciesComparison, amount);
    setAmount(1);
    setCurrenciesComparison(DEFAULT_COMPARISON);
  };

  // TODO fix type
  const currencyFilter = (input: string, option: any) => {
    return option!.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className="track-form-wrapper">
      <Card bordered={false}>
        <Title level={3}>Track exchange rates</Title>
        <Form name="customized_form_controls" layout="inline">
          <Space direction="vertical" size="large">
            <Space align="center">
              <Select
                showSearch
                size="large"
                placeholder="Select a currency"
                optionFilterProp="children"
                filterOption={currencyFilter}
                value={currenciesComparison.from}
                onChange={onCurrencyChange('from')}
                style={{
                  width: 300,
                }}
              >
                <Option value="EUR">
                  <span className={`currency-flag currency-flag-eur currency-flag-lg`}></span>
                  <span>{props.allCurrencies['EUR']}</span>
                </Option>
              </Select>
              <SwapOutlined />
              <Select
                showSearch
                size="large"
                placeholder="Select a currency"
                optionFilterProp="children"
                filterOption={currencyFilter}
                value={currenciesComparison.to}
                onChange={onCurrencyChange('to')}
                style={{
                  width: 300,
                }}
              >
                {Object.keys(props.allCurrencies).map(value => {
                  return (
                    <Option value={value}>
                      <span className={`currency-flag currency-flag-${value.toLowerCase()} currency-flag-lg`}></span>
                      <span>{props.allCurrencies[value]}</span>
                    </Option>
                  );
                })}
              </Select>
            </Space>

            <Space align="center">
              <Input prefix="€" suffix={currenciesComparison.from} onChange={onAmountChange} defaultValue={1} />
              <Button
                type="primary"
                htmlType="submit"
                onClick={trackNewFx}
                disabled={!currenciesComparison.from || !currenciesComparison.to || !amount}
              >
                Add
              </Button>
            </Space>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default TrackForm;
