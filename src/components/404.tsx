import { Image } from "@heroui/react";

export default function Custom404() {
  return(
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <Image src="/not-found.png" alt="404" width={400} height={400} />
    </div>
  )
}