import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StyledMenu from "@/components/Header/Menu/index.styled";
import Badge from "@/components/Badge";
import Dropdown from "@/components/Dropdown";

import { getCookie } from "@/utils/auth";

function Menu() {
  const cartList = useSelector((state) => state.cartListState);
  const count = cartList.length;

  const [authorized, setAuthorized] = useState(getCookie("accessToken"));

  return (
    <StyledMenu>
      <ul>
        <li>
          <Link to="/cart">
            장바구니
            {count > 0 && <Badge count={count} />}
          </Link>
        </li>
        <li>
          <Link to="/not-found">주문목록</Link>
        </li>
        <li>{authorized ? <Dropdown /> : <Link to="/login">로그인</Link>}</li>
      </ul>
    </StyledMenu>
  );
}

export default Menu;
