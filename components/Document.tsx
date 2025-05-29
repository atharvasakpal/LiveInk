'use client'

import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';

const Document = ({id} : {id:string}) => {

    const [data,loading, error] = useDocumentData(doc(db, 'documents', id));

    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();

    useEffect(() => {
        if (data?.title !== undefined) {
            setInput(data.title ?? "");
        }
    }, [data]);


    const updateTitle = (e : FormEvent)=>{
        e.preventDefault(); //prevent default form submission behavior (refreshing the page)
        if(input.trim())
        {
            startTransition(async()=>{
                await updateDoc(doc(db,'documents',id),{
                    title : input,
                })
            })
        }
    }

  return (
    <div>


        <div className='flex max-w-6xl mx-auto justify-between pb-5'>
            <form onSubmit={updateTitle} className='flex flex-1 items-center gap-2'>
            <input type="text" value={input} className="input input-primary flex-grow" onChange={(e)=> setInput(e.target.value)} />
            <button className="btn btn-outline btn-primary" disabled={isUpdating} type='submit' >
                {isUpdating ? 'Updating...' : 'Update'}
            </button>
                {/* if  */}
                {/* is owner && invite users  */}

            </form>
            {/* to change the document title */}
        </div>




      <div>
        {/* manage users  */}
      </div>





        {/* collaborative editor  */}

    </div>



  )
}

export default Document
