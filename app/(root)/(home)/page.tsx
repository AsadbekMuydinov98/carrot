'use client'
import React from 'react'
import Header from '../_components/header'
import ProductCard from '@/components/shared/product-card'
import Cta from '../_components/statistics'

export default function HomePage() {
  
  return (
    <div>
      <Header />
      <div>
        <h1 className='text-center text-4xl mt-10 section-title'><span>New products</span></h1>
        <div className='mt-5'>
          <ProductCard />
        </div>
        <div><Cta /></div>
      </div>
    </div>
  )
}
