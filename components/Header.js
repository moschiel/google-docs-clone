import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

function Header() {
    return (
        <header className='flex items-center px-4 py-2 shadow-md bg-white'>
            <Button
                color='gray'
                buttonType='outline'
                rounded={true}
                iconOnly={true}
                ripple='dark'
                className='h-20 w-20 border-0'
            >
                <Icon name='menu' size='3xl'/>
            </Button>
            <Icon name='description' size='5xl' color='blue' />
            <h1 className='ml-2 text-gray-700 text-2xl'>Docs</h1>

            <div className='mx-5 flex flex-grow px-5 py-2 
            bg-gray-100 text-gray-600 rounded-lg 
            focus-within:text-gray-600 focus-within:shadow-md'>
                <Icon name='search' size='3xl' color='gray'/>
                <input type='text' placeholder='Search' 
                className='flex-grow px-5 text-base bg-transparent outline-none'/>
            </div>

            <Button
                color='gray'
                buttonType='outline'
                rounded={true}
                iconOnly={true}
                ripple='dark'
                className='h-20 w-20 border-0'
            >
                <Icon name='apps' size='3xl' color='gray'/>
            </Button>

            <img
                loading='lazy'
                // onClick={signOut} 
                className='cursor-pointer h-12 w-12 rounded-full ml-2'
                src='https://avatars.githubusercontent.com/u/45469807?v=4'
                alt=''
            />
        </header>
    )
}

export default Header
