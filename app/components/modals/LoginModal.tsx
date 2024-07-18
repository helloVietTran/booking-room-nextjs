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
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useVerifyModal from '@/app/hooks/useVerifyModal';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

import { signIn } from "../../config/api";


const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const verifyModal = useVerifyModal();
    const registerModal = useRegisterModal();
    const currentUser = useCurrentUser();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn(data)
        .then(res=> {
            loginModal.onClose();
            Cookies.set('jwt',res.data.token, {expires: 1} );
            currentUser.login(res.data);
            toast.success("Đăng nhập thành công");
        })
        .catch((error)=> {
            toast.error('Tài khoản hoặc mật khẩu không chính xác');
        })
        .finally(()=> {
            setIsLoading(false);
        })
    }
    const toggleModal = useCallback(()=> {
        registerModal.onOpen();
        loginModal.onClose();
    }, [registerModal, loginModal]);
    //body 
    const bodyContent= (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Chào mừng đã trở lại"
                subtitle="Đăng nhập ngay"
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
                        Chưa có tài khoản
                    </div>
                    <div
                        onClick={toggleModal}
                        className="text-neutral-800
                                    cursor-pointer
                                    hover:underline
                                  "   
                    >
                       Đăng ký ngay
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
        disabled={isLoading}
        isOpen= {loginModal.isOpen}
        title="Đăng nhập"
        actionLabel="Tiếp tục"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal