import AptosoICon from 'data-base64:~assets/logo-show.png';
// import FlashXIconGif from 'data-base64:~assets/welcomePage/FlashXIcon.gif'
import { useCallback } from 'react';

import { useCustomStorage } from '~content-components/providers/CustomStorageProvider';
import { cn } from '~utils/lib';

function SidebarIcon() {
  const { openSidebar, setOpenSidebar } = useCustomStorage();
  // const [showLogoGif, { setFalse, setTrue }] = useBoolean()

  return (
    <div id="sidebar" className={cn('fixed bottom-24 right-[6px] z-[100]')}>
      <button
        onClick={() => setOpenSidebar(true)}
        id="icon-open-sidebar"
        className="flex items-center justify-center">
        <img src={AptosoICon} alt="background-img" className="size-[90px]" />
      </button>
    </div>
  );
}

export default SidebarIcon;
