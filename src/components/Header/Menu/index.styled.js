import styled from "@emotion/styled";

const StyledMenu = styled.div`
  display: inline-flex;
  margin-right: 20px;

  ul {
    display: flex;
    align-items: center;

    li {
      padding: 0 0 0 25px;
      a {
        position: relative;
        display: block;
        padding: 10px 0;
        font-size: ${({ theme }) => theme.fontSize.m};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export default StyledMenu;
