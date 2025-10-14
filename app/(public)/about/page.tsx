import AboutContent from '@/components/animation/AboutContent'

import { Metadata } from 'next'
import Head from 'next/head'

import React from 'react'



export const metadata: Metadata = {
  title: "درباره ما",
  description: "درباره ما موسسه مهاجرتی کایان",
  keywords: "ویزا,مشاوره مهاجرتی,وکیل مهاجرتی,سایت مهاجرتی,ویزای کار,موسسه مهاجرتی,مهاجرت, اقامت, ویزای شینگن, ویزای استارت آپ"
};

export default function AboutPage() {
  return (
    <>
      <Head>
        <title> درباره ما - موسسه مهاجرتی کایان</title>
        <meta name="description" content="درباره با موسسه مهاجرتی کایان برای مشاوره و خدمات مهاجرتی" />
        <meta name="keywords" content="وکیل مهاجرتی
        ,سایت مهاجرتی
        ,ویزای کار
        ,ویزای کانادا
        ,موسسه مهاجرتی
        , تماس با ما
        , مشاوره مهاجرتی 
        ,ویزای شینگن
        ,ویزای استارت آپ 
        ,اقامت 
        ,مهاجرت" />
      </Head>

      <AboutContent />
    </>

  )
}
