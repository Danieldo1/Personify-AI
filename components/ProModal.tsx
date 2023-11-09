'use client'

import {useState} from 'react'
import { useProModal } from '@/hooks/UsePro'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { ShoppingBag } from 'lucide-react'
import { useToast } from './ui/use-toast'
import axios from 'axios'

const ProModal = () => {
  const proModal = useProModal()
  const {toast} = useToast()

  const [loading, setLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url


      toast({
        title: 'Subscription Successful',
        description: 'Thanks for Subscribing',
      })
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Something went wrong',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose} >
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className='text-center text-3xl'>
              Unlock <span className='bg-clip-text bg-gradient-to-r from-sky-500 to-purple-500 text-transparent font-lg  '>Pro </span>
          </DialogTitle>

            <DialogDescription className='text-center space-y-2 text-xl'>
              Create Your <span className='bg-clip-text bg-gradient-to-r from-sky-500 to-purple-500 text-transparent font-lg animate-[pulse_5s_infinite]'> Custom Personify AI</span>
            </DialogDescription>
        </DialogHeader>
               <Separator />
                <div className='flex justify-between'>
                    <p className='font-medium text-2xl'>
                      $14
                      <span className='text-sm font-normal'>.99 /month</span>
                      
                    </p>
                    <Button disabled={loading} variant={'fresh'} onClick={onSubscribe} className='group group-hover:text-black before:ease relative overflow-hidden transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40'>
                      <ShoppingBag className='w-5 h-5 mr-2  group-hover:text-black group-hover:transition group-hover:delay-100' />
                        <span className='group-hover:text-black group-hover:transition group-hover:delay-100'>Subscribe</span>
                    </Button>
                </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal