import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1850px;
`;

export const TopSwitchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
  margin-bottom: 1em;
`;
export const TopSwitchBtnL = styled.div`
  font-weight: 900;
  background: #222222;
  cursor: pointer;
  padding: 5px 1em;
  margin-bottom: -1px;
  z-index: 5;
  margin-right: 1em;
  color: white;
  background: ${props =>
    props.active === "Basic" ? "#222222" : "rgba(34,34,34, 0.5)"};
`;
export const TopSwitchBtnR = styled.div`
  font-weight: 900;
  background: #222222;
  cursor: pointer;
  padding: 5px 1em;
  margin-bottom: -1px;
  z-index: 5;
  color: white;
  background: ${props =>
    props.active === "Advanced" ? "#222222" : "rgba(34,34,34, 0.5)"};
`;

export const ver = styled.div`
  color: whitesmoke;
  align-self: flex-end;
`;
