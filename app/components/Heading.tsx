"use client"

interface HeadingProps{
    title: string;
    subtitle: string;
    center?: boolean;

}
const Heading: React.FC<HeadingProps> = ({
    title, subtitle, center
}) => {
  return (
    <div
         className={center ? "text-center" : "text-start"}
    >
        <h2 className="text-xl font-bold">
            {title}
        </h2>  
        <div className="font-light text-neutral-500 mt-2">
            {subtitle}
        </div>
    </div>
  )
}

export default Heading