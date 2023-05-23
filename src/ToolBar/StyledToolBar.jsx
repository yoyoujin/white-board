import styled from 'styled-components';

export const DesignbarWrapper = styled.div`
  display: flex;
  z-index: 10;
`;

export const ToolWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  background-color: #fff;
  width: 70px;
  height: 296px;
  border-radius: 10px;
  padding: 18px 10px;

  button {
    width: 50px;
    height: 50px;

    &:hover {
      background-color: #ededed;
      border-radius: 5px;
    }

    &.active {
      background-color: #ebf0ff;
      border-radius: 5px;
    }
  }
`;

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 20;
  top: 0;
  left: 25px;
  background-color: #fff;
  width: 54px;
  height: 388px;
  padding: 10px 7px;
  border-radius: 5px;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 13%;
    width: 0;
    height: 0;
    border: 17px solid transparent;
    border-bottom-width: 10px;
    border-top-width: 10px;
    border-right-color: #fff;
    border-left: 0;
    margin-top: -17px;
    margin-left: -17px;
  }
`;

export const StrokeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  padding-bottom: 14px;
  width: 36px;
  height: 124px;

  button {
    width: 30px;
    height: 30px;
  }
`;

export const ColorWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 36px;
  height: 244px;
  padding: 19px 0 5px 0;
`;

export const ColorChip = styled.li`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #ededed;
    border-radius: 5px;
  }
`;

export const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
