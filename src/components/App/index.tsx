import React, { FC } from 'react';
import { Row } from 'antd';

import TrackForm from '../TrackForm';
import TrackCard from '../TrackCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import * as service from '../../services/api';
import { ITracker, ICurrencyComparison } from '../../types';

import './index.scss';

enum LocalStorageKeys {
  CURRENCIES = 'curencies',
  TRACKERS = 'trackers',
}

const App: FC = () => {
  const [currencies, setCurrencies] = useLocalStorage(LocalStorageKeys.CURRENCIES, []);
  const [trackersFromStorage, setTrackersToStorage] = useLocalStorage(LocalStorageKeys.TRACKERS, []);
  const [trackers, setTrackers] = React.useState<ITracker[]>(trackersFromStorage);
  const initialMount = React.useRef(true);

  React.useEffect(() => {
    if (initialMount.current) {
      // Get new rates on page load
      (async () => {
        for (let tracker of trackers) {
          const newRate = await service.getExchangeRate({ from: tracker.from, to: tracker.to });
          tracker = {
            ...tracker,
            rate: newRate,
          };
        }
        setTrackers(trackers);
      })();
    }
    initialMount.current = false;
  }, [trackers]);

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
    const rate = await service.getExchangeRate(comparison);
    const newTracker = {
      to: comparison.to,
      from: comparison.from,
      amount,
      rate,
    };
    setTrackers([...trackers, newTracker]);
    setTrackersToStorage([...trackersFromStorage, newTracker]);
  };

  return (
    <div className="page-wrapper">
      {currencies && <TrackForm allCurrencies={currencies} trackNewRate={onTrackNewFx} />}
      <Row gutter={[16, 16]}>
        {trackers.map(tracker => {
          return <TrackCard {...tracker} />;
        })}
      </Row>
    </div>
  );
};

export default App;
