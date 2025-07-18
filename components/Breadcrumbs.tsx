'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Breadcrumbs = () => {
  const path = usePathname()
  const segments = path.split('/').filter(Boolean) // Remove empty strings

  return (
    <div className="breadcrumbs text-sm hidden md:inline">
      <ul>
        <li>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
  const href = '/' + segments.slice(0, index + 1).join('/')
  const isLast = index === segments.length - 1
  const label = decodeURIComponent(segment).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  const isDocuments = segment.toLowerCase() === 'doc'

  return (
    <li key={index}>
      {isLast || isDocuments ? (
        <span className="inline-flex items-center gap-2 capitalize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-4 w-4 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {label}
        </span>
      ) : (
        <Link href={href} className="capitalize">
          {label}
        </Link>
      )}
    </li>
  )
})}

      </ul>
    </div>
  )
}

export default Breadcrumbs
