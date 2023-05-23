import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 800px;
  background-color: #fff;
  width: 54px;
  height: 388px;
  padding: 10px 7px;
  border: 1px solid black;
  border-radius: 5px;

  .strokeButton {
    border-bottom: 1px solid #d7d7d7;
  }
  button {
    width: 30px;
    height: 30px;
  }
`;
