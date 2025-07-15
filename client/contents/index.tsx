import type { PlasmoCSConfig } from "plasmo"

import "./global.css"

import cssGlobal from "data-text:~/contents/global.css"

import ContentComponent from "~content-components"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  css: ["font.css"]
}

// Inject into the ShadowDOM
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssGlobal
  return style
}

export const getShadowHostId = () => "plasmo-X-sidebar"

const XSidebar = () => {
  return <ContentComponent />
}

export default XSidebar
