import {AiOutlineClose} from 'react-icons/ai'

import {
  NxtWatchPremiumContainer,
  NxtWatchLogoImg,
  NxtWatchPremiumHeading,
  NxtWatchGetPremiumBtn,
  LogoAndCloseBtnContainer,
  CloseBtn,
} from './styledComponents'

const NxtWatchPremium = props => {
  const {OnClosePremiumBuyBanner} = props
  return (
    <NxtWatchPremiumContainer>
      <LogoAndCloseBtnContainer>
        <NxtWatchLogoImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="Banner logo"
        />
        <CloseBtn type="button">
          <AiOutlineClose onClick={OnClosePremiumBuyBanner} />
        </CloseBtn>
      </LogoAndCloseBtnContainer>
      <NxtWatchPremiumHeading>
        Buy Nxt Watch Premium Prepaid Plans with UPI
      </NxtWatchPremiumHeading>
      <NxtWatchGetPremiumBtn type="button">GET IT NOW</NxtWatchGetPremiumBtn>
    </NxtWatchPremiumContainer>
  )
}

export default NxtWatchPremium
