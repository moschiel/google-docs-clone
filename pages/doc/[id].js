import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {useRouter} from 'next/dist/client/router';
import { db } from '../../firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { getSession, useSession, signOut } from 'next-auth/client';
import Login from "../../components/Login";
import { data } from "browserslist";
import TextEditor from "../../components/TextEditor";

function Doc() {
    const [session] = useSession();

    if(!session) return <Login />
    
    const router = useRouter();
    const { id } = router.query;

    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db.collection('userDocs')
        .doc(session.user.email)
        .collection('docs')
        .doc(id)
    )

    //if u dont have access to this doc, go back (maybe incorrect user)
    if( !loadingSnapshot && !snapshot?.data()?.fileName ) {
        router.replace('/');
    }

    return (
        <div>
            <header className='flex items-center p-3 pb-1'>
                <span onClick={() => router.push('/')}
                    className='cursor-pointer'
                >
                    <Icon name='description' size='5xl' color='blue' />
                </span>

                <div className='flex-grow px-2'>
                    <h2>{snapshot?.data()?.fileName}</h2>
                    <div className='flex items-center text-sm space-x-1 -ml-1 text-gray-600'>
                        <p className='option'>File</p>
                        <p className='option'>Edit</p>
                        <p className='option'>View</p>
                        <p className='option'>Insert</p>
                        <p className='option'>Format</p>
                        <p className='option'>Tools</p>
                    </div>
                </div>

                <Button
                    color='lightBlue'
                    buttonType='filled'
                    size='regular'
                    className='hidden sm:inline-flex h-10'
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple='light'
                >   
                    <Icon name='people' size='md'/>
                    SHARE
                </Button>

                <img
                    loading='lazy'
                    onClick={signOut} 
                    className='hidden sm:inline-flex cursor-pointer h-12 w-12 rounded-full ml-2'
                    src={session?.user?.image}
                    alt=''
                />
            </header>

            <TextEditor />
        </div>
    )
}

export default Doc;

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    return { 
      props: {
        session,
      },
    };
  }
