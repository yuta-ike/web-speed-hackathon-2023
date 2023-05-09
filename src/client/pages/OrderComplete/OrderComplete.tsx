import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { AspectRatio } from '../../components/foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../components/foundation/GetDeviceType';
import { PrimaryAnchor } from '../../components/foundation/PrimaryAnchor';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useAuthUser } from '../../hooks/useAuthUser';
import { loadFonts } from '../../utils/load_fonts';

import * as styles from './OrderComplete.styles';

import type { FC } from 'react';

export const OrderComplete: FC = () => {
  const navigate = useNavigate();
  const [isReadyFont, setIsReadyFont] = useState(false);
  const { authUserLoading, isAuthUser } = useAuthUser();

  useEffect(() => {
    loadFonts().then(() => {
      setIsReadyFont(true);
    });
  }, []);

  if (authUserLoading) {
    return null;
  }
  if (!isAuthUser) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>購入が完了しました</title>
      </Helmet>
      <GetDeviceType>
        {({ deviceType }) => (
          <WidthRestriction>
            <div className={styles.container()}>
              <div className={styles.notice()}>
                <h2 className={styles.noticeHeading()}>購入が完了しました</h2>
                <AspectRatio ratioHeight={1} ratioWidth={2}>
                  <div className={styles.noticeDescriptionWrapper()}>
                    <p
                      className={classNames(styles.noticeDescription(), {
                        [styles.noticeDescription__desktop()]: deviceType === DeviceType.DESKTOP,
                        [styles.noticeDescription__mobile()]: deviceType === DeviceType.MOBILE,
                        [styles.noticeDescriptionFallback()]: !isReadyFont,
                      })}
                    >
                      {isReadyFont ? 'このサイトは架空のサイトであり、商品が発送されることはありません' : ''}
                    </p>
                  </div>
                </AspectRatio>
              </div>

              <div className={styles.recommended()}>
                <h2 className={styles.recommendedHeading()}>こちらの商品もオススメです</h2>
                <ProductHeroImage />
              </div>

              <div className={styles.backToTopButtonWrapper()}>
                <PrimaryAnchor href="/" size="lg">
                  トップへ戻る
                </PrimaryAnchor>
              </div>
            </div>
          </WidthRestriction>
        )}
      </GetDeviceType>
    </>
  );
};
