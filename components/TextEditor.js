import dynamic from 'next/dynamic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import React, {useState, useEffect} from 'react';
import { db } from '../firebase';
import { useRouter } from 'next/dist/client/router';
import { convertFromRaw, convertToRaw } from 'draft-js';
import Login from './Login';
import { useSession } from 'next-auth/client';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(
        module => module.Editor  
    ),
    {
        ssr: false,
    }
);

function TextEditor() {
    const [session] = useSession();

    if(!session) return <Login />
    const router = useRouter();
    const { id } = router.query; // or id = router.query.id

    const [snapshot] = useDocumentOnce(
        db.collection('userDocs')
        .doc(session.user.email)
        .collection('docs')
        .doc(id)
    );

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        if(snapshot?.data()?.editorState){
            console.log('AQUI')
            setEditorState(EditorState.createWithContent(
                convertFromRaw(snapshot.data().editorState)
            ));
        }
    }, [snapshot]);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);

        db.collection('userDocs')
        .doc(session.user.email)
        .collection('docs')
        .doc(id)
        .set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge: true
        });        
    }

    return (
        <div className='bg-[#F8F9FA] min-h-screen'>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName='flex !justify-center mx-auto sticky top-0 z-50' 
                editorClassName='mt-6 p-5 bg-white shadow-lg max-w-4xl mx-auto mb-12 border'
            />
        </div>
    );
}

export default TextEditor;
