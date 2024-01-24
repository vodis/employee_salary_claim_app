import styled from 'styled-components';

export const DepositButtonContainer = styled.div`
  display: block;
`;

export const DepositButtonStyle = styled.button`
  display: inline-block;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  border-radius: 10px;
  height: 40px;
  padding: 10px 20px 16px;
  box-sizing: border-box;
  text-decoration: none;
  background: #23acde;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  &:active {
    background-color: #0041a0;
    border-color: #0041a0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
