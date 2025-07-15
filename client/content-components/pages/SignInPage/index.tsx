import XIcon from "data-base64:~assets/icons/x_black.svg"
import LoginVideo from "data-base64:~assets/login.mp4"
import React, { useEffect } from "react"
import { useBoolean } from "react-use"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import IconLoading from "~content-components/components/Icons/IconLoading"
import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import router from "~content-components/routes"
import { ERoute } from "~content-components/routes/routes"
import { userQuery } from "~query/user"
import { getFullPathname } from "~utils/lib"

const SignInPage = () => {
  const [loading, setLoading] = useBoolean(false)
  const { getUserProfile } = userQuery()
  const { setOpenSidebar, setAccessToken, setRefreshToken } = useCustomStorage()

  const handleLogin = () => {
    if (!loading) {
      setOpenSidebar(true)
      setLoading(true)
      window.open(
        `${process.env.PLASMO_PUBLIC_API_URL}/oauth/twitter?env=extension`,
        "_self"
      )
    }
  }

  useEffect(() => {
    const search = window.location.search
    if (search) {
      const params = new URLSearchParams(search)
      const accessToken = params.get("accessToken")
      const refreshToken = params.get("refreshToken")

      if (accessToken) {
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        getUserProfile.mutate(accessToken)

        const newUrl = window.location.origin + window.location.pathname
        window.history.replaceState(null, "", newUrl)

        router.navigate(getFullPathname(ERoute.SecurePassword))
      }
    }

    if (window.location.href.includes("twitter.com/i/oauth2")) {
      setLoading(true)
    }
  }, [])

  return (
    <>
      <div className="flex flex-col h-full items-center justify-between py-[30px]">
        <video
          src={LoginVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full object-cover"
        />
        <div className="flex flex-col items-center justify-center gap-4">
          {Logo}

          <p className="text-[22px] text-[#23F7DD] ">Earn while you scroll</p>
        </div>

        <div className="flex flex-col w-full px-4 gap-4">
          <ButtonLinear
            type="button"
            className="justify-between"
            onClick={handleLogin}>
            <span className="text-sm text-black font-bold uppercase">
              Login with Twitter
            </span>
            {loading ? (
              <IconLoading />
            ) : (
              <img src={XIcon} alt="icon-x" className="size-5" />
            )}
          </ButtonLinear>
          <button className="rounded-2xl w-full h-[50px] flex justify-between items-center p-4 overflow-hidden">
            <span className="text-sm font-bold uppercase text-white">
              View campaings
            </span>
            <IconArrow color="white" />
          </button>
        </div>

        <div className="flex flex-col text-sm text-placeholder text-center">
          <p>By registering or logging in, you agree to our</p>
          <span className="text-white">Terms and Privacy Policy.</span>
        </div>
      </div>
    </>
  )
}

export default SignInPage

const IconArrow = ({ color = "black" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.8351 11.6296L9.20467 5.1999C8.79094 4.79869 8 5.04189 8 5.5703L8 18.4297C8 18.9581 8.79094 19.2013 9.20467 18.8001L15.8351 12.3704C16.055 12.1573 16.0549 11.8427 15.8351 11.6296Z"
        fill={color}
      />
    </svg>
  )
}

export const Logo = (
  <svg
    width="207"
    height="24"
    viewBox="0 0 207 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28.8181 22.7188L26.2564 18.5951H10.5116L7.91873 22.7188H0.296251L14.1979 1.41329H22.6326L36.503 22.7188H28.8181ZM13.2607 14.1903H23.4761L18.384 6.00553L13.2607 14.1903ZM37.8383 22.7188V1.41329H59.2687C64.517 1.41329 68.172 3.28767 68.172 9.00453C68.172 15.0338 64.517 17.2518 59.2687 17.2518H44.1799V22.7188H37.8383ZM58.5502 6.849H44.1799V11.8473H58.5502C60.5808 11.8473 61.6117 11.1601 61.6117 9.34817C61.6117 7.41131 60.5808 6.849 58.5502 6.849ZM82.194 6.849H69.5419V1.41329H101.156V6.849H88.5356V22.7188H82.194V6.849ZM120.024 23.1561C107.81 23.1561 102.53 19.6885 102.53 12.066C102.53 4.44354 107.81 0.975939 120.024 0.975939C132.239 0.975939 137.518 4.44354 137.518 12.066C137.518 19.6885 132.239 23.1561 120.024 23.1561ZM120.024 17.7204C128.553 17.7204 131.052 16.1897 131.052 12.066C131.052 7.94239 128.553 6.41164 120.024 6.41164C111.465 6.41164 108.872 7.94239 108.872 12.066C108.872 16.1897 111.465 17.7204 120.024 17.7204ZM169.023 16.6583C169.023 21.1568 165.961 23.1249 155.434 23.1249C150.123 23.1249 143.969 22.3751 140.126 21.4379L141.032 16.3459C145.406 17.3143 150.716 18.1578 157.121 18.1578C162.119 18.1578 163.025 17.7516 163.025 16.4708C163.025 15.1587 162.244 15.0026 160.588 14.8464L148.811 14.1591C142.188 13.8467 139.783 11.7224 139.783 7.75495C139.783 2.97528 143.969 1.03842 153.84 1.03842C157.62 1.03842 163.775 1.63197 167.992 2.53792L166.961 7.31759C163.337 6.59908 157.714 6.00553 152.372 6.00553C146.624 6.00553 145.781 6.31792 145.781 7.59875C145.781 8.78586 146.593 8.97329 148.53 9.09825L160.151 9.78553C166.274 10.1292 169.023 12.2535 169.023 16.6583ZM188.758 23.1561C176.543 23.1561 171.263 19.6885 171.263 12.066C171.263 4.44354 176.543 0.975939 188.758 0.975939C200.972 0.975939 206.252 4.44354 206.252 12.066C206.252 19.6885 200.972 23.1561 188.758 23.1561ZM188.758 17.7204C197.286 17.7204 199.785 16.1897 199.785 12.066C199.785 7.94239 197.286 6.41164 188.758 6.41164C180.198 6.41164 177.605 7.94239 177.605 12.066C177.605 16.1897 180.198 17.7204 188.758 17.7204Z"
      fill="white"
    />
  </svg>
)
