import * as currencyFormatter from 'currency-formatter';

import { useActiveOffer } from '../../../hooks/useActiveOffer';
import { normalizeCartItemCount } from '../../../utils/normalize_cart_item';
import { Anchor } from '../../foundation/Anchor';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { Image } from '../../foundation/Image';
import { OutlineButton } from '../../foundation/OutlineButton';
import { ProductOfferLabel } from '../../product/ProductOfferLabel';

import * as styles from './CartItem.styles';

import type { MediaFileFragmentResponse, ShoppingCartItemFragmentResponse } from '../../../graphql/fragments';
import type { ChangeEventHandler, FC } from 'react';

type Props = {
  item: ShoppingCartItemFragmentResponse;
  onUpdate: (productId: number, count: number) => void;
  onRemove: (productId: number) => void;
};

export const CartItem: FC<Props> = ({ item, onRemove, onUpdate }) => {
  const thumbnailFile = (item.product as any).thumbnail.file as MediaFileFragmentResponse;
  const { activeOffer } = useActiveOffer(item.product);
  const price = activeOffer?.price ?? item.product.price;

  const updateCount: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const count = normalizeCartItemCount(ev.target.valueAsNumber || 1);
    onUpdate(item.product.id, count);
  };

  return (
    <div className={styles.container()}>
      <div className={styles.item()}>
        <Anchor href={`/product/${item.product.id}`}>
          <div className={styles.itemInner()}>
            {thumbnailFile ? (
              <div className={styles.thumbnail()}>
                <GetDeviceType>
                  {({ deviceType }) => {
                    return (
                      <Image
                        fill
                        src={thumbnailFile.filename}
                        width={deviceType === DeviceType.DESKTOP ? '256px' : '50%'}
                        height={deviceType === DeviceType.DESKTOP ? '144px' : undefined}
                      />
                    );
                  }}
                </GetDeviceType>
                {activeOffer !== undefined && (
                  <div className={styles.offerLabel()}>
                    <ProductOfferLabel size="base">タイムセール中</ProductOfferLabel>
                  </div>
                )}
              </div>
            ) : null}
            <div className={styles.details()}>
              <p className={styles.itemName()}>{item.product.name}</p>
              <p className={styles.itemPrice()}>{currencyFormatter.format(price, { code: 'JPY', precision: 0 })}</p>
            </div>
          </div>
        </Anchor>
      </div>
      <div className={styles.controller()}>
        <label className={styles.counter()}>
          個数:
          <input
            className={styles.counterInput()}
            defaultValue={item.amount}
            max={999}
            min={1}
            onBlur={updateCount}
            type="number"
          />
        </label>
        <OutlineButton onClick={() => onRemove(item.product.id)} size="base">
          削除
        </OutlineButton>
      </div>
    </div>
  );
};
