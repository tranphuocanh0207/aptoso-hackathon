import '~popup/global.css';
import { CustomStorageProvider } from '~content-components/providers/CustomStorageProvider';
import PopupContent from '~popup-components';

// import 'https://www.googletagmanager.com/gtag/js?id=$PLASMO_PUBLIC_GTAG_ID'
// import { useEffect } from 'react'

const PopupX = () => {
  // useEffect(() => {
  //   window.dataLayer = window.dataLayer || []
  //   window.gtag = function gtag() {
  //     window.dataLayer.push(arguments) // eslint-disable-line
  //   }
  //   window.gtag('js', new Date())
  //   window.gtag('config', process.env.PLASMO_PUBLIC_GTAG_ID, {
  //     page_path: '/popup',
  //     debug_mode: true
  //   })
  // }, [])

  return (
    <CustomStorageProvider>
      <PopupContent />
    </CustomStorageProvider>
  );
};

export default PopupX;
