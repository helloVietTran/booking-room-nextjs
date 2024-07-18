"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie"
import Modal from "./Modal";
import useVerifyModal from "@/app/hooks/useVerifyModal";
import useEmail from "@/app/hooks/useUserEmail";
import Input from "../inputs/Input";
import { verify } from "../../config/api";

const VerifyModal = () => {
  const verifyModal = useVerifyModal();
  const userEmail = useEmail();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      otp: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const userId = Cookies.get('userId');
    data.userId  = userId;
    console.log(data)
    verify(data)
      .then(() => {
        Cookies.remove('userId')
        verifyModal.onClose();
        toast.success("Xác thục thành công");
      })
      .catch((error) => {
        toast.error("OTP đã hết hiệu lực hoặc không chính xác");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const bodyContent = (
    <div>
      <p className="pb-4 text-lg">
          Vui lòng kiểm tra OTP trong email của bạn. Mã này gồm 6 số
      </p>
      <div className="flex flex-row gap-3">
        <Input
          id="otp"
          label="OTP"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className="w-full">Chúng tôi đã gửi mã OTP cho bạn đến: 
          <br />
          <span className="font-semibold">{userEmail.email}</span>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={verifyModal.isOpen}
      title="Nhập mã bảo mật"
      actionLabel="Tiếp tục"
      onClose={verifyModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default VerifyModal;
