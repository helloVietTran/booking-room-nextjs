"use client"
import React, { useMemo, useState } from 'react'
import { FieldValues,useForm, SubmitHandler } from 'react-hook-form';
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import LocationSelect from '../inputs/LocationSelect';
import ImageUpload from '../inputs/ImageUpload';
import Counter from '../inputs/Counter';
import Input from '../inputs/Input';
import dynamic from 'next/dynamic';

enum STEPS{
    CATEGORY= 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,

}
const RentModal = () => {   
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    },
    reset
  } = useForm<FieldValues >({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      title: '',
      description: '',
      price: 40000
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  // render lại
  const Map = useMemo(()=>dynamic(()=> import('../Map'), {
    ssr: false
  }), [location])

  const setCustomValue = (id: string, value: any)=>{
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true, 
    })
  }

  const onBack = () => {
    setStep(value => value -1);
  }
  const onNext = () => {
    setStep(value => value + 1);
  }
  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    // nếu không phải bước cuối thì không gửi form
    if(step !== STEPS.PRICE){
      return onNext();
    }
    setIsLoading(true);

    
  }

  const actionLabel = useMemo(()=> {
    if(step === STEPS.PRICE){
        return "Hoàn thành";
    }
    return "Tiếp theo"
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.CATEGORY){
        return undefined;
    }
    return "Quay lại"
  }, [step]);

  //STEP 1
  let bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading 
        title='Điểm đặc biệt nhất của căn nhà bạn là gì?'
        subtitle='Chọn loại nhà'

      />
      <div className='
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              max-h-[50vh]
              overflow-y-auto
      '>
        {categories.map(item => {
          return(
            <div key={item.label} className='col-span-1'>
              <CategoryInput 
                  onClick = {(category)=> {
                      setCustomValue('category', category)
                  }}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
              />
            </div>
          )
        })}
      </div>
    </div>
      
  )
  //STEP 2
  if(step === STEPS.LOCATION){
    bodyContent= (
      <div className='flex flex-col gap-6'>
        <Heading 
          title='Địa chỉ cho thuê ở đâu'
          subtitle='Khách tìm bạn thế nào'

        />
        <LocationSelect 
          value={location}
          onChange={(value) => {
            setCustomValue('location', value)
          }}
        />
        <Map 
          center={location?.latlng}
        />
      </div>
    )
  }
// STEP 3
  if(step === STEPS.INFO){
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading 
          title='Chia sẻ cho mọi người về địa điểm của bạn'
          subtitle='Tiện ích của căn nhà là gì?'
          />
          <Counter
            title='Số khách'
            subtitle='Có thể cho bao nhiêu người ở?'
            value={guestCount}
            onChange={(value) => setCustomValue('guestCount', value)}

          />
          <hr />
          <Counter
            title='Số phòng'
            subtitle='Có bao nhiêu phòng?'
            value={roomCount}
            onChange={(value) => setCustomValue('roomCount', value)}
            
          />
          <hr />
          <Counter
            title='Số phòng tắm'
            subtitle='Có bao nhiêu phòng tắm?'
            value={bathroomCount}
            onChange={(value) => setCustomValue('bathroomCount', value)}
            
          />
          
      </div>
    )
  }
//STEP 4
   if(step === STEPS.IMAGES){
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading 
          title='Thêm hình ảnh về chỗ ở của bạn'
          subtitle='Hãy cho khách xem địa điểm trông như thế nào'
        />
        <ImageUpload 
          value={imageSrc}
          onChange={(value) => { setCustomValue('imageSrc', value)}}
        />
      </div>
    )
   }
  // STEP 5
  if(step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='Bạn hãy mô tả về chỗ ở của bạn'
          subtitle='Hãy mô tả ngắn và nét đặc trưng'
         />
         <Input 
          id='title'
          label='Tiêu đề'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
         />
         <hr />
         <Input 
          id='description'
          label='Mô tả'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
         />
      </div>
    )
  }
  //STEP 6
  if(step === STEPS.PRICE){
    bodyContent = (
      <div className = 'flex flex-col gap-6'>
        <Heading 
          title='Hãy đặt giá bạn muốn'
          subtitle='Giá ở cho một đêm bao nhiêu?'
        />
        <Input 
          id='price'
          label='Giá'
          disabled={isLoading}
          register={register}
          required
          errors={errors}
         />
          
      </div>
    )
  }
  return (
    <Modal 
        isOpen= {rentModal.isOpen}
        title='Cho thuê chỗ ở'
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
    />
  )
}

export default RentModal