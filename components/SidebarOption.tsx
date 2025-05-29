'use client'

import { doc } from 'firebase/firestore'
import { db } from '@/firebase'
import Link from 'next/link'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { usePathname } from 'next/navigation'

const SidebarOption = ({href, id}: {href: string, id: string}) => {

    const [data, loading, error] = useDocumentData(doc(db,'documents',id));
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName !== '/';

    if(!data) return null;


  return (
    <Link
  href={href}
  className={`inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold transition duration-200
    ${isActive ? "bg-indigo-500/20 text-white hover:bg-indigo-500/30" : "bg-transparent text-gray-400 hover:bg-indigo-500/10"}`}
>
  <p className="text-sm truncate">{data?.title}</p>
</Link>

  )
}

export default SidebarOption
