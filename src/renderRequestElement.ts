import {QROptions, RequestData, ShouldRenderButton, RequestElementResult} from './types'
import {renderRequestButton} from './elements/renderRequestButton'
import {renderRequestQRCode} from './elements/renderRequestQRCode'

const bowser = require('bowser')
const appendQuery = require('append-query')

const renderRequestElement = (config: {
  container: HTMLElement
  requestData: RequestData
  qrOptions?: Partial<QROptions>
  shouldRenderButton?: ShouldRenderButton
  buttonCallbackUrl: string
}): RequestElementResult => {
  if (config.shouldRenderButton === undefined) {
    config.shouldRenderButton = parsedResult => {
      const isSupportedPlatform = parsedResult.platform.type === 'mobile' || parsedResult.platform.type === 'tablet'
      const isSupportedOS = parsedResult.os.name === 'iOS' || parsedResult.os.name === 'Android'

      return isSupportedPlatform && isSupportedOS
    }
  }

  const shouldRenderButton = config.shouldRenderButton(bowser.parse(window.navigator.userAgent))

  // Append a query parameter to inform the server how the data has been shared
  config.requestData.url = appendQuery(config.requestData.url, `share-kit-from=${shouldRenderButton ? 'button' : 'qr'}`)

  if (shouldRenderButton) {
    return renderRequestButton(config)
  } else {
    return renderRequestQRCode(config)
  }
}

export {renderRequestElement}
