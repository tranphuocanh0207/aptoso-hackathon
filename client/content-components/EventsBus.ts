class EventBus {
  private events: { [key: string]: EventListener[] }

  constructor() {
    this.events = {}
  }

  on(event: string, listener: EventListener): void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  off(event: string, listenerToRemove: EventListener): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        (listener) => listener !== listenerToRemove
      )
    }
  }

  emit(event: string, data?: any): void {
    if (this.events[event]) {
      this.events[event].forEach((listener) => {
        listener(data)
      })
    }
  }
}

export const bus = new EventBus()

export const EVENT_BUS = {
  LIKE: "LIKE",
  FOLLOW: "FOLLOW",
  COMMENT: "COMMENT",
  RETWEET: "RETWEET",
  TWEET_CLICKED: "TWEET_CLICKED",

  CAMPAIGN_LIST: "CAMPAIGN_LIST",
  CAMPAIGN_DATA_UPDATE: "CAMPAIGN_DATA_UPDATE",
  NEW_CAMPAIGN: "NEW_CAMPAIGN",
  CAMPAIGN_CLAIMED: "CAMPAIGN_CLAIMED"
}
