'use client'

import { createNewDocument } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'

const NewDocumentButton = () => {

  const [isPending , startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {

    startTransition(async () => {
      const {docId} = await createNewDocument()
      router.push(`/doc/${docId}`);
    })

  }

  return (
    <button className="btn btn-primary" onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? 'Creating...' : 'New Document'}
    </button>
  )
}

export default NewDocumentButton
