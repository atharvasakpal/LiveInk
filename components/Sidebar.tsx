'use client'
import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import { PanelRight, PanelRightClose } from 'lucide-react'
import {useCollection} from 'react-firebase-hooks/firestore';
import { useUser } from '@clerk/nextjs';
import { collectionGroup, DocumentData, query,where } from 'firebase/firestore';
import { db } from '@/firebase';
import SidebarOption from './SidebarOption';



interface RoomDocument extends DocumentData{
    createdAt: string; 
    role : 'owner' | 'editor' ;
    roomId: string;
    userId: string;
}

const Sidebar = () => {

    const {user} = useUser();

    const [groupedData,setGroupData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: []
    })




    const [data, loading ,error] = useCollection(
        user && (
            query(
                collectionGroup(db, 'rooms'), 
                    where('userId', '==', user.emailAddresses[0]?.toString())
                )
        )
    );




    useEffect(() => {
        if(!data)return;


        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr)=>{
                const roomData = curr.data() as RoomDocument;

                if(roomData.role ==='owner'){
                    acc.owner.push({
                        id: curr.id,
                        ...roomData
                    });
                }
                else 
                {
                    acc.editor.push({
                        id: curr.id,
                        ...roomData
                    })
                }
                return acc;
            },{
                owner: [],
                editor: []
            }
        )
        setGroupData(grouped)
    },[data])




    const menuOptions = (
        <>
        <NewDocumentButton/>

        <div className='flex flex-col py-4 space-y-4 md: max-w-36'>
        {/* My Documents */}
        {groupedData.owner.length === 0? (
            <h2 className='text-gray-500 font-semibold text-sm'>No Documents Found !</h2>
        ) : (
            <>
            <h2 className='text-gray-500 font-semibold text-sm'>My Documents</h2>
            {groupedData.owner.map((doc)=>(
                //  <p key={doc.roomId}>{doc.roomId}</p>
                 <SidebarOption key= {doc.id} id={doc.id} href ={`/doc/${doc.id}`}/>
            ))}
            </>
        )}
        </div>


        {/* Shared with me */}
        {groupedData.editor.length>0 && (
            <>
            <h2 className='text-gray-500 font-semibold text-sm'>Shared With Me</h2>
            {groupedData.owner.map((doc)=>(
                //  <p key={doc.roomId}>{doc.roomId}</p>
                 <SidebarOption key= {doc.id} id={doc.id} href ={`/doc/${doc.id}`}/>
            ))}
            </>
        )}



        </>
    );






  return (
    <div className='p-2 md:p-5 relative'>

        <div className="drawer md:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><PanelRight/></label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"><PanelRightClose/></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>{menuOptions}</li>
            
            </ul>
        </div>
        </div>

        <div className='hidden md:inline'>
            {menuOptions}
        </div>
      

    </div>
  )
}

export default Sidebar
