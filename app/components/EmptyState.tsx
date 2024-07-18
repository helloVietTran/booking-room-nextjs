"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import Heading from './Heading';
import Button from './Button'

interface EmptyStateProps{
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "Không tìm thấy địa điểm nào"
    , subtitle = "Cố gắng thay đổi hoặc loại bỏ bộ lọc"
    , showReset
}) => {
    const router = useRouter();

  return (
    <div className='
                    flex
                    h-[60vh]
                    flex-col
                    gap-2
                    justify-center
                    items-center
    '
    >
        <Heading 
            center
            title={title}
            subtitle={subtitle}
        />
        <div className='w-48 mt-4'
        >
            {
                showReset && (
                    <Button 
                        outline
                        label='Xóa bộ lọc'
                        onClick={()=> router.push("/")}
                    />
                )
            }
        </div>
    </div>
  )
}

export default EmptyState