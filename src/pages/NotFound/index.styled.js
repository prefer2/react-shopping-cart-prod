import styled from "@emotion/styled";

const StyledNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

const StyledNotFoundMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
`;

export { StyledNotFoundContainer, StyledNotFoundMessage };
