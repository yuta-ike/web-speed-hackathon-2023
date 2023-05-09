import { useState } from 'react';

import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './OrderForm.styles';

import type { ChangeEventHandler, FC, FormEvent } from 'react';

type OrderFormValue = {
  zipCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
};

type Props = {
  onSubmit: (orderFormValue: OrderFormValue) => void;
};

export const OrderForm: FC<Props> = ({ onSubmit }) => {
  const [city, setCity] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleZipcodeChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const zipCode = event.target.value;
    setZipCode(zipCode);

    const zipcodeJa = await import('zipcode-ja').then((m) => m.default);

    const address = [...(zipcodeJa[zipCode]?.address ?? [])];
    const prefecture = address.shift();
    const city = address.join(' ');

    setPrefecture(prefecture);
    setCity(city);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      city,
      prefecture,
      streetAddress,
      zipCode,
    });
  };

  return (
    <div className={styles.container()}>
      <form className={styles.form()} data-testid="order-form" onSubmit={handleSubmit}>
        <div className={styles.inputList()}>
          <TextInput
            required
            id="zipCode"
            label="郵便番号"
            placeholder="例: 1500042"
            value={zipCode}
            onChange={(e) => handleZipcodeChange(e)}
          />
          <TextInput
            required
            id="prefecture"
            label="都道府県"
            placeholder="例: 東京都"
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
          />
          <TextInput
            required
            id="city"
            label="市区町村"
            placeholder="例: 渋谷区宇田川町"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextInput
            required
            id="streetAddress"
            label="番地・建物名など"
            placeholder="例: 40番1号 Abema Towers"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div className={styles.purchaseButton()}>
          <PrimaryButton size="lg" type="submit">
            購入
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
