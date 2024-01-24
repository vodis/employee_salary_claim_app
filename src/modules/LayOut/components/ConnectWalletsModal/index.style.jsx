import styled from 'styled-components';

// Mobile breakpoint
const mobileBreakpoint = '768px';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;

  @media (max-width: ${mobileBreakpoint}) {
    width: 90%;
    max-width: 100%;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

export const WalletOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 2px solid #dadada;
  border-radius: 8px;
  cursor: pointer;
  background: #e5e7f5;

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  span {
    font-size: 14px;
    margin-top: 10px;
    font-weight: 500;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const WalletOptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 20px;

  @media (max-width: ${mobileBreakpoint}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
