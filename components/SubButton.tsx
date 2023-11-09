'use client'

import { ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import axios from "axios"

interface Props {
    isPro: boolean
}

const SubButton = ({isPro=false}: Props) => {
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')

            window.location.href = response.data.url
        } catch (error) {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: 'Something went wrong',
            })
        }finally{
            setLoading(false)
        }
    }

  return (
    <Button size={'sm'} disabled={loading} onClick={onClick}  variant={isPro? "destructive": 'fresh'}>
        {!isPro && <ShoppingBag className="w-5 h-5 mr-2" />}
        {isPro ? 'Manage Subscription' : 'Subscribe'}
    </Button>
  )
}

export default SubButton