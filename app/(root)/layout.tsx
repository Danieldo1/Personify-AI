import Nav from '@/components/Nav'

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full'>
        <Nav />
        <main className='md:pl-20 pt-16 h-full'>
        {children}
        </main>
    </div>
  )
}

export default RootLayout