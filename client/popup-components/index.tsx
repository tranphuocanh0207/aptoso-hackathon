import React from 'react';
import LoginVideo from 'data-base64:~assets/login.mp4';
import { useCustomStorage } from '~content-components/providers/CustomStorageProvider';
import ButtonLinear from '~content-components/components/Buttons/ButtonLinear';
import IconArrow from '~content-components/components/Icons/IconArrow';

const PopupContent = () => {
  const { setOpenSidebar } = useCustomStorage();
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
        <ButtonLinear
          onClick={() => setOpenSidebar(true)}
          type="button"
          className="justify-between">
          <span className="text-sm font-bold uppercase text-black-main">
            View campaigns
          </span>
          <IconArrow color="black" className="rotate-90" />
        </ButtonLinear>
      </div>
    </div>
  );
};

export default PopupContent;
