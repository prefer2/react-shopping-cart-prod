import { Link } from "react-router-dom";

import StyledLogoLink from "@/components/Header/Logo/index.styled";

function LogoLink() {
  return (
    <StyledLogoLink>
      <Link className="logo-link" to="/">
        도민샵
      </Link>
    </StyledLogoLink>
  );
}

export default LogoLink;
