import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {useRouter} from 'next/dist/client/router';

function DocumentRow({id, fileName, date}) {
    const router = useRouter();

    return (
        <div
            onClick={()=> router.push(`/doc/${id}`)} 
            className='flex items-center p-4 text-gray-700 text-sm cursor-pointer rounded-lg hover:bg-gray-100'>
            <Icon name='article' size='3xl' color='blue' />
            <p className='px-3 flex-grow truncate'>{fileName}</p>
            <p className=' text-sm'>{date?.toDate().toLocaleDateString()}</p>
            <Button
              color='gray'
              buttonType='outline'
              rounded={true}
              iconOnly={true}
              ripple='dark'
              className='border-0'
            >
              <Icon name='more_vert' size='3xl' color='gray'/>
            </Button>
        </div>
    )
}

export default DocumentRow
