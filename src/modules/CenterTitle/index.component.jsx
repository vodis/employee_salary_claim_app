import {
  CenterTitleCenter,
  CenterTitleContainer,
  CenterTitleTextCurrentStyle,
  CenterTitleTextStyle
} from './index.style';

const CenterTitle = () => {
  const onClick = () => {
    const url = 'https://app.airdrop-hunter.site/'; // Замените на вашу ссылку
    window.open(url, '_self');
  };

  return (
    <CenterTitleCenter>
      <CenterTitleContainer>
        <CenterTitleTextStyle onClick={onClick}>Airdrops</CenterTitleTextStyle>
        <CenterTitleTextCurrentStyle>Referrals</CenterTitleTextCurrentStyle>
      </CenterTitleContainer>
    </CenterTitleCenter>
  );
};

export default CenterTitle;
