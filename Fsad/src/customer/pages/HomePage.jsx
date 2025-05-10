import React from 'react'
import MainCarosel from '../components/HomeCarosel/MainCarosel'
import HomeSectionCarosel from '../components/HomeSectionCarosel/HomeSectionCarosel'
import farmfresh from '../../Data/farmfresh'

import electronics from '../../Data/electronics'
import cosmetics from '../../Data/cosmetics'
import decoratives from '../../Data/decoratives'
import dailyneeds from '../../Data/dailyneeds'
import cleaners from '../../Data/cleaners'
export default function HomePage() {
  return (
    <div>
      <MainCarosel />
      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        <HomeSectionCarosel data={farmfresh} sectionName={"farmfresh"} />
        <HomeSectionCarosel data={dailyneeds} sectionName={"dailyneeds"} />
        <HomeSectionCarosel data={cosmetics} sectionName={"cosmetics"} />
        <HomeSectionCarosel data={electronics} sectionName={"electronics"} />
        <HomeSectionCarosel data={decoratives} sectionName={"decoratives"} />
        <HomeSectionCarosel data={cleaners} sectionName={"cleaners"} />
      </div>
    </div>
  )
}
