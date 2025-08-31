import { verify } from "@/features/auth/services/authService";
import { api } from "@/services/api.config";
import React from "react";
import { Navigate, useParams } from "react-router";

const VerifyMail =  () => {
    const {uid,token}=useParams()
    const res = verify(uid,token)
  return <></>;
};

export default VerifyMail;
