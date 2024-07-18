"use client"

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useVerifyModal from '@/app/hooks/useVerifyModal';
import useEmail from '@/app/hooks/useUserEmail';
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { signUp } from "../../config/api";


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const verifyModal = useVerifyModal();
    const userEmail = useEmail();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        userEmail.setEmail(data.email);
        signUp(data)
        .then((res)=> {
            Cookies.set('userId', res.data, { expires: 7 }); 
            registerModal.onClose();  
            verifyModal.onOpen();
            toast.success("Đăng ký thành công");
        })
        .catch((error)=> {
            toast.error('Hệ thống đang bảo trì');
        })
        .finally(()=> {
            setIsLoading(false);
        })
    }

    const toggleModal = useCallback(()=> {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);
    //body 
    const bodyContent= (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Chào mừng bạn đến với Web đặt phòng"
                subtitle="Tạo tài khoản ngay"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors= {errors}
                required
            />
            <Input
                id="name"
                label="Tên tài khoản"
                disabled={isLoading}
                register={register}
                errors= {errors}
                required
            />
            <Input
                id="password"
                label="Mật khẩu"
                disabled={isLoading}
                register={register}
                errors= {errors}
                required
                hideButton
            />
        </div>
    )
    //footer modal
    const footerContent = (
        <div className="flex flex-col gap-3 mt-3">
            <hr />
            <Button 
                outline
                label="Đăng nhập với Google"
                icon={FcGoogle}
                onClick={()=> {}}
            />
            <Button 
                outline
                label="Đăng nhập với Github"
                icon={AiFillGithub}
                onClick={()=> {}}
            />
            <div
                className="text-neutral-500 text-center mt-4 font-light"
            >
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>
                        Đã có tài khoản
                    </div>
                    <div
                        onClick={toggleModal}
                        className="text-neutral-800
                                    cursor-pointer
                                    hover:underline
                                  "   
                    >
                       Đăng nhập ngay
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
        disabled={isLoading}
        isOpen= {registerModal.isOpen}
        title="Đăng ký"
        actionLabel="Tiếp tục"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal