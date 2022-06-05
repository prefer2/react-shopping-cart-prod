import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { addProductToCart } from "@/redux/modules/cartList";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import Button from "@/components/Button";

import { BASE_URL, MESSAGE } from "@/constants";

import StyledProductDetailContainer from "@/pages/ProductDetail/index.style";

function ProductDetail() {
  const [productInfo, setProductInfo] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleCartClick = () => {
    const { name, price, imgUrl } = productInfo;
    dispatch(addProductToCart({ id, name, price, imgUrl }));
    dispatch(toggleSnackbarOpen(MESSAGE.CART_ADDED));
  };

  const getProductDetail = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products/${id}`);
      setProductInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <StyledProductDetailContainer>
      <img src={productInfo.imgUrl} alt={`${productInfo.name}상세 페이지`} />
      <div className="product__name">{productInfo.name}</div>
      <hr />
      <div className="product__price__wrapper">
        <div className="product__price__label">금액</div>
        <div className="product__price">
          {productInfo.price?.toLocaleString("ko-KR")}원
        </div>
      </div>
      <Button onClick={handleCartClick}>장바구니</Button>
    </StyledProductDetailContainer>
  );
}

export default ProductDetail;
