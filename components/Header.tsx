'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'

const Header = () => {
    const {user} = useUser();
  return (
    <div className='flex items-center justify-between p-5'>
      {user && (
        <Link href="/" className="text-2xl font-bold">
        <h1>{user?.firstName}{`'s`} Ink</h1>
      </Link>
      )}


      {/* breadcrumbs */}

      <div>

        <SignedOut>
            <SignInButton/>
        </SignedOut>

        <SignedIn>
            <UserButton/>
        </SignedIn>
      </div>

    </div>
  )
}

export default Header
