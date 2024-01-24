import styled from 'styled-components';

export const DropdownMenu = styled.div`
  position: absolute;
  inset: 25px auto auto -200px;
  margin: 0;
  width: 160px;
  transform: translate(0px, 5px);
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 19px 20px 22px;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(69, 88, 190, 0.1);
`;

export const DropdownItem = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.buttonConnectedText};
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  justify-content: space-between;
  padding-bottom: 18px;
  align-items: center;

  font-weight: 600;
  font-size: 16px;
  line-height: 130%;

  svg {
    fill-opacity: 0.3;
  }

  &:hover {
    svg {
      fill-opacity: 1;
    }

    color: ${(props) => props.theme.colors.text};
  }
`;
