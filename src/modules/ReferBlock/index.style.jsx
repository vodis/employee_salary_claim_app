import styled from 'styled-components';
import { ReactComponent as ArrowDown } from '../../ui/images/arrowDown.svg';

const mobileBreakpoint = '768px';

export const ReferBlockConatainer = styled.div`
  margin-top: 5px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
`;

export const ReferBlockBox = styled.div`
  background: ${(props) => props.theme.colors.background};
  box-shadow: 0 10px 30px rgba(69, 88, 190, 0.1);
  border-radius: 10px;
  width: 100%;
  margin-bottom: 10px;
  padding: 24px 24px 24px 24px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${mobileBreakpoint}) {
  }
`;

export const ReferBlockLine = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  cursor: ${({ isFull }) => (isFull ? 'default' : 'pointer')};
  margin-bottom: ${({ isMargin }) => (isMargin ? '20px' : '0')};
  background: ${({ isBackGorund, theme }) =>
    isBackGorund ? theme.colors.secondLineBackground : theme.colors.background};

  @media (max-width: ${mobileBreakpoint}) {
  }
`;

export const ReferBlockLineStyled = styled.div`
  padding-bottom: 10px;
  cursor: default;
  background: ${({ isBackGorund, theme }) =>
    isBackGorund ? theme.colors.secondLineWrapperBackground : theme.colors.background};
`;

export const ReferBlockStatus = styled.div`
  content: '';
  width: 20px;
  height: 20px;
  min-width: 20px;
  background: #23acde;
  display: block;
  border-radius: 100px;
  margin-right: 20px;

  @media (max-width: ${mobileBreakpoint}) {
    width: 0;
    height: 0;
    min-width: 0;
    background: #23acde;
    display: block;
    border-radius: 100px;
    margin-right: 0;
  }
`;

export const ReferBlockInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReferBlockTopInfo = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #636775;
  margin-bottom: 5px;

  @media (max-width: ${mobileBreakpoint}) {
    margin-top: 10px;
    display: flex;
    justify-content: start;
    line-height: ${({ isAmount }) => (isAmount ? '34px' : '17px')};
  }
`;

export const ReferBlockBottomInfo = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: ${mobileBreakpoint}) {
    white-space: nowrap;
  }
`;

export const ReferBlockBottomInfo1 = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.colors.text};
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;

  justify-content: center;
  box-sizing: border-box;
  float: right;

  @media (max-width: ${mobileBreakpoint}) {
    white-space: nowrap;
  }
`;

export const ReferBlockArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ReferBlockArrowDown = styled(ArrowDown)``;

export const ReferBlockArrowUp = styled(ArrowDown)`
  transform: rotate(180deg);
`;

export const ReferBlockOpenInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
    align-items: center;
    display: grid;
  }
`;

export const ReferBlockOpenTopInfo = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #636775;

  @media (max-width: ${mobileBreakpoint}) {
    margin-bottom: 10px;
    text-align: center;
  }
`;

export const ReferBlockOpenTime = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.text};
  margin-left: 10px;
  justify-content: center;
  display: flex;

  @media (max-width: ${mobileBreakpoint}) {
    margin-left: 0;
    white-space: nowrap;
  }
`;

export const ReferBlockOpenAddressEnd = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.text};
  margin-left: 0;
  justify-content: center;
  display: flex;

  @media (max-width: ${mobileBreakpoint}) {
    margin-left: 0;
    white-space: nowrap;
  }
`;

export const ReferBlockOpenAddress = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.text};
  justify-content: center;
  align-content: flex-end;
  align-items: flex-end;
  box-sizing: border-box;
  text-align: right;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  float: right;
  margin-left: 0px;

  @media (max-width: ${mobileBreakpoint}) {
    margin-left: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ReferBlockOpenBottomInfo = styled.div`
  font-weight: 600;
  margin-left: 10px;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: ${mobileBreakpoint}) {
    margin-left: 0;
    display: flex;
    justify-content: start;
    align-items: start;
    align-content: start;
  }
`;

export const ReferBlockDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: ${mobileBreakpoint}) {
    display: block;
  }
`;
