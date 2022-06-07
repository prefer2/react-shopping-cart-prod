import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser, getUserInfo } from "@/redux/modules/user";

import useInput from "@/hooks/useInput";
import usePasswordConfirm from "@/hooks/usePasswordConfirm";
import useFetch from "@/hooks/useFetch";

import Form from "@/components/Form";
import Field from "@/components/Field";

import { getCookie } from "@/utils/auth";

import {
  PATH,
  STATUS,
  INPUT_TYPE,
  MESSAGE,
  NICKNAME,
  PASSWORD,
} from "@/constants";

import StyledUserEditContainer from "@/pages/UserEdit/index.style";

function UserEdit() {
  const [nickname, onChangeNickname] = useInput(
    INPUT_TYPE.NICKNAME,
    STATUS.FULFILLED
  );
  const [password, onChangePassword] = useInput(
    INPUT_TYPE.PASSWORD,
    STATUS.READY
  );
  const [passwordConfirm, onChangePasswordConfirm] = usePasswordConfirm();
  const [preventFormSubmit, setPreventFormSubmit] = useState(true);
  const {
    error: editError,
    success: editSuccess,
    getData: editUser,
  } = useFetch("put", "users/me");
  const {
    error: withdrawError,
    success: withdrawSuccess,
    getData: withdrawUser,
  } = useFetch("delete", "users/me");
  const { email: prevEmail } = useSelector((state) => state.userState);
  const { nickname: prevNickname } = useSelector((state) => state.userState);
  const { authorized } = useSelector((state) => state.userState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      Authorization:
        getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
    };
    editUser(
      {
        nickname: nickname.value,
        password: password.value,
      },
      headers
    );
  };

  const handleWithdrawalClick = async () => {
    if (confirm(MESSAGE.WITHDRAWAL_CONFIRM)) {
      const headers = {
        Authorization:
          getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
      };
      withdrawUser({}, headers);
    }
  };

  useEffect(() => {
    if (!editError && editSuccess) {
      navigate(PATH.MAIN);
    }
  }, [editError, editSuccess]);

  useEffect(() => {
    if (!withdrawError && withdrawSuccess) {
      dispatch(logoutUser());
      navigate(PATH.MAIN);
    }
  }, [withdrawError, withdrawSuccess]);

  useEffect(() => {
    if (
      nickname.status === STATUS.FULFILLED &&
      password.status === STATUS.FULFILLED &&
      passwordConfirm.status === STATUS.FULFILLED
    ) {
      setPreventFormSubmit(false);
      return;
    }
    setPreventFormSubmit(true);
  }, [nickname, password, passwordConfirm]);

  useEffect(() => {
    if (!authorized) {
      navigate(PATH.MAIN);
    }
  }, [authorized]);

  return (
    <StyledUserEditContainer>
      <h2>회원정보 수정</h2>
      <Form
        buttonText="확인"
        onSubmit={handleEditSubmit}
        preventFormSubmit={preventFormSubmit}
      >
        <Field
          labelName="아이디"
          type="email"
          placeholder={prevEmail}
          disabled
        />
        <Field
          labelName="닉네임"
          type="text"
          value={prevNickname}
          minLength={NICKNAME.MIN_LENGTH}
          maxLength={NICKNAME.MAX_LENGTH}
          onChange={onChangeNickname}
          errorMessage={nickname.status}
        />
        <Field
          labelName="비밀번호"
          type="password"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          onChange={onChangePassword}
          errorMessage={password.status}
        />
        <Field
          labelName="비밀번호 확인"
          type="password"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          onChange={(e) => {
            onChangePasswordConfirm(e, password.value);
          }}
          errorMessage={passwordConfirm.status}
        />
      </Form>
      <div className="withdrawal">
        <a onClick={handleWithdrawalClick}>회원탈퇴</a>
      </div>
    </StyledUserEditContainer>
  );
}

export default UserEdit;
