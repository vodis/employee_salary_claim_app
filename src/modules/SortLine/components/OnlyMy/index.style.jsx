import styled from 'styled-components';

export const OnlyMyContainer = styled.div`
  margin-left: 40px;
  width: 125px;
  display: flex;
  flex-direction: row;
  cursor: default;
  align-items: center;
`;

export const OnlyMyTogglerWrapper = styled.label`
  display: flex;
  align-items: center;
  height: 20px;
  cursor: pointer;
  position: relative;
`;

export const OnlyMyHiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const OnlyMyTogglerSlider = styled.div`
  background-color: ${({ checked }) => (checked ? '#0dcaf0' : '#ccc')};

  border-radius: 100px;
  width: 36px;
  top: 0;
  left: 0;
  height: 100%;
  transition: background-color 300ms ease;
`;

export const OnlyMyTogglerKnob = styled.div`
  width: calc(20px - 6px);
  height: calc(20px - 6px);
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  transition: left 300ms ease;
  left: ${({ checked }) => (checked ? 'calc(100% - 16px - 1px)' : '3px')};
  top: 3px;
`;

export const OnlyMyText = styled.span`
  margin-left: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.buttonConnectedText};
`;
