import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"

import DetectX from "~content-components/components/DetectX"
import { bus, EVENT_BUS } from "~content-components/EventsBus"
import { useCampaignStore } from "~stores/campaign"

import { useCustomStorage } from "./CustomStorageProvider"

const DetectXProvider = ({ children }: { children: React.ReactNode }) => {
  const campaigns = useCampaignStore((s) => s.campaigns)
  const setCampaigns = useCampaignStore((s) => s.setCampaigns)

  const { userInfo } = useCustomStorage()

  useEffect(() => {
    const getData = (data: any) => {
      if (data && data?.campaignId) {
        const arrTemp = campaigns.map((item) =>
          item?.campaignId === data?.campaignId ? data : item
        )
        setCampaigns(arrTemp)
        bus.emit(EVENT_BUS.CAMPAIGN_LIST, {
          campaigns: arrTemp
        })
      }
    }

    bus.on(EVENT_BUS.CAMPAIGN_DATA_UPDATE, getData)
    return () => {
      bus.off(EVENT_BUS.CAMPAIGN_DATA_UPDATE, getData)
    }
  }, [campaigns])

  useEffect(() => {
    let timeOut: any

    const injectComponentIntoTweet = (
      tweetElement: Element,
      key: number,
      data: any
    ) => {
      const existing = tweetElement.querySelector(
        `.campaign-${data?.campaignId}`
      )

      if (existing) {
        return
      }

      tweetElement["style"].position = "relative"

      const container = document.createElement("div")
      container.className = `campaign-${data?.campaignId}`

      //   Tìm footer để chèn vào trước
      const footer = tweetElement.querySelector('div[role="group"]')
      if (footer && footer.parentElement) {
        footer.parentElement.insertBefore(container, footer)

        const root = ReactDOM.createRoot(container)
        root.render(<DetectX key={key} data={data} />)
      }
    }

    const checkCommentContent = () => {
      const tweetElements = document.querySelectorAll(
        'article[data-testid="tweet"][tabindex="0"]'
      )

      if (tweetElements.length > 0) {
        const firstThreeTweetElements = Array.from(tweetElements).slice(0, 5)

        firstThreeTweetElements.forEach((tweetElement, index) => {
          const tweetTextElement: any = tweetElement.querySelector(
            '[data-testid="tweetText"]'
          )
          const usernameDiv = tweetElement.querySelector<HTMLElement>(
            'div[data-testid="User-Name"]'
          )

          let username = ""
          if (usernameDiv) {
            const aList = usernameDiv.querySelectorAll("a")
            const usernameTemp = Array.from(aList)
              .map((el) => el.href?.trim())
              .filter(Boolean)
              .pop() // thường username nằm cuối cùng

            if (usernameTemp?.includes(userInfo?.username)) {
              username = userInfo?.username
            }
          }

          if (tweetTextElement && username) {
            const tweetContent = tweetTextElement.innerText
            const tweetContentFormat = tweetContent?.toLowerCase().trim()

            if (tweetContentFormat) {
              bus.emit(EVENT_BUS.COMMENT, {
                isComment: true,
                commentText: tweetContentFormat,
                username
              })
            }
          } else {
            //do something
          }
        })
      } else {
        //do something
      }
    }

    const observeTweets = () => {
      checkCommentContent()

      const tweets = document.querySelectorAll('article[role="article"]')
      const unfollowButtons = document.querySelectorAll<HTMLElement>(
        '[data-testid$="-unfollow"]'
      )

      unfollowButtons.forEach((btn) => {
        const dataTestId = btn.getAttribute("data-testid")

        if (dataTestId.includes("unfollow")) {
          let username: string
          const usernameDiv = document.querySelector<HTMLElement>(
            'div[data-testid="UserName"]'
          )

          if (usernameDiv) {
            const spanList = usernameDiv.querySelectorAll("span")
            username = Array.from(spanList)
              .map((el) => el.textContent?.trim())
              .filter(Boolean)
              .pop() // thường username nằm cuối cùng
          }

          bus.emit(EVENT_BUS.FOLLOW, {
            isFollow: true,
            username
          })
        }
      })

      tweets.forEach((tweet) => {
        // Kiểm tra xem tweet này có chứa anchor nào khớp status không
        campaigns.forEach((data, index) => {
          const statusId = data.link.split("/status/")[1]
          const anchor = tweet.querySelector(`a[href*="/status/${statusId}"]`)

          if (anchor) {
            const title = tweet.querySelector("span#aptoso-title")
            const likeBtn = tweet.querySelector('button[data-testid="unlike"]')
            const retweetBtn = tweet.querySelector(
              'button[data-testid="unretweet"]'
            )

            if (likeBtn) {
              bus.emit(EVENT_BUS.LIKE, {
                isLike: true,
                title: title ? title?.innerHTML : null
              })
            }

            if (retweetBtn) {
              bus.emit(EVENT_BUS.RETWEET, {
                isRetweet: true,
                title: title ? title?.innerHTML : null
              })
            }

            const eventComment = () => {
              function getReplyText() {
                const textbox = document.querySelector('div[role="textbox"]')
                return textbox?.textContent?.trim() || ""
              }

              const tweetButtonsInline = document.querySelectorAll(
                'button[data-testid*="tweetButton"]'
              )

              tweetButtonsInline.forEach((tweetButton, tweetButtonIndex) => {
                if (tweetButtonIndex === 0) {
                  tweetButton.addEventListener("click", () => {
                    bus.emit(EVENT_BUS.COMMENT, {
                      isComment: true,
                      commentText: getReplyText()
                    })
                  })
                }
              })
            }

            eventComment()

            // Nếu khớp, inject component
            injectComponentIntoTweet(tweet, index, {
              ...data,
              index
            })
          }
        })
      })
    }

    // Theo dõi DOM thay đổi để inject liên tục
    const observer = new MutationObserver(() => {
      timeOut = setTimeout(() => {
        observeTweets()
      }, 1000)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
      // attributeFilter: ["class", "data-testid", "aria-pressed"],
      // characterData: true
    })

    // Gọi lần đầu để xử lý các tweet đã render
    timeOut = setTimeout(() => {
      observeTweets()
    }, 1000)

    return () => {
      clearTimeout(timeOut)
      const cleanupInjectedComponents = () => {
        document
          .querySelectorAll('[className^="campaign-"]')
          .forEach((el) => el.remove())
      }

      cleanupInjectedComponents()
    }
  }, [campaigns, userInfo])

  return children
}

export default DetectXProvider
