import { Companion } from "@prisma/client"
import Image from "next/image"
import { Card, CardFooter, CardHeader } from "./ui/card"
import Link from "next/link"
import {  MessagesSquare } from "lucide-react"

interface CompanionsProps {
    data: (Companion & {
        _count: {
            messages: number
        }
    })[]
}


const Companions = ({data}: CompanionsProps) => {

    if(data.length === 0){
        return (
            <div className="pt-10 flex flex-col items-center justify-center space-y-3">
                <div className='relative '>
                    <Image
                    height={350}
                    width={350}
                    className="grayscale mr-10"
                    alt="Empty"
                    src='/empty.png'
                    />
                </div>
                <p>No Personas Found</p>
            </div>
        )
    }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 pb-10">
        {data.map((item) => (
        <Card 
        key={item.id}
        className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0 "
        >
            <Link href={`/chat/${item.id}`}>
                <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
                    <div className="relative h-32 w-32">
                        <Image 
                       fill
                        src={item.src}
                        alt={item.name}
                        className="rounded-xl object-cover"
                        />
                    </div>
                    <p className="font-bold">
                        {item.name}
                    </p>
                    <p className="text-xs ">
                    {item.description.split(' ').slice(0, 20).join(' ')}...
                    </p>
                </CardHeader>

                    <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                        <p className="lowercase">
                            @{item.userName}
                        </p>

                        <div className="flex items-center space-x-1">
                            <MessagesSquare className="h-4 w-4 mr-1" />
                            {item._count.messages}
                        </div>
                    </CardFooter>
            </Link>
        </Card>
        ))}
    </div>
  )
}

export default Companions