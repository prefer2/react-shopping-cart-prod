import styled from "@emotion/styled";

const StyledBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -18px;
  background-color: ${({ theme }) => theme.colors.pink_500};
  font-size: ${({ theme }) => theme.fontSize.xs};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  opacity: 0.9;
  text-align: center;
  line-height: 20px;
  padding: 2px;
`;

export default StyledBadge;
