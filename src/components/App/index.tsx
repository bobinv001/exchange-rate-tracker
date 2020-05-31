import React, { FC } from 'react';
import { Row } from 'antd';

import TrackForm from '../TrackForm';
import TrackCard from '../TrackCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import * as service from '../../services/api';
import { ITracker, ICurrencyComparison } from '../../types';

import './index.scss';

const App: FC = () => {
  const [currencies, setCurrencies] = useLocalStorage('currencies', null);
  const [trackers, setTrackers] = React.useState<ITracker[]>([]);

  React.useEffect(() => {
    if (!currencies) {
      (async () => {
        try {
          const currencySymbols = await service.getCurrencies();
          setCurrencies(currencySymbols);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [currencies, setCurrencies]);

  const onTrackNewFx = async (comparison: ICurrencyComparison, amount: number) => {
    const rate = await service.getExchangeRate(comparison, amount);
    const newTracker = {
      to: comparison.to,
      from: comparison.from,
      amount,
      rate,
      result: amount * rate,
    };
    setTrackers([...trackers, newTracker]);
  };

  return (
    <div className="page-wrapper">
      {currencies && <TrackForm allCurrencies={currencies} trackNewRate={onTrackNewFx} />}
      <Row gutter={[16, 16]}>
        {trackers.map((tracker: any) => {
          return <TrackCard {...tracker} />;
        })}
      </Row>
    </div>
  );
};

export default App;
