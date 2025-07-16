import React from 'react';
import LoginVideo from 'data-base64:~assets/login.mp4';
import { useCustomStorage } from '~content-components/providers/CustomStorageProvider';
import ButtonLinear from '~content-components/components/Buttons/ButtonLinear';
import IconArrow from '~content-components/components/Icons/IconArrow';
import XIcon from 'data-base64:~assets/icons/x_black.svg';
import { bus, EVENT_BUS } from '~content-components/EventsBus';

const PopupContent = () => {
  const { setOpenSidebar, accessToken, setIsSigninFromPopup } =
    useCustomStorage();

  const handleLogin = () => {
    setOpenSidebar(true);
    setIsSigninFromPopup(true);
    bus.emit(EVENT_BUS.SIGNIN_POPUP, true);
  };

  return (
    <div className="w-[300px] h-auto bg-black-main pb-6">
      <video
        src={LoginVideo}
        autoPlay
        muted
        loop
        playsInline
        className="w-full object-cover"
      />

      <div className="px-4 mt-10">
        {accessToken ? (
          <ButtonLinear
            onClick={() => setOpenSidebar(true)}
            type="button"
            className="justify-between">
            <span className="text-sm font-bold uppercase text-black-main">
              View campaigns
            </span>
            <IconArrow color="black" className="rotate-90" />
          </ButtonLinear>
        ) : (
          <ButtonLinear
            type="button"
            className="justify-between"
            onClick={() => handleLogin()}>
            <span className="text-sm text-black font-bold uppercase">
              Login with Twitter
            </span>
            <img src={XIcon} alt="icon-x" className="size-5" />
          </ButtonLinear>
        )}
      </div>
    </div>
  );
};

export default PopupContent;
