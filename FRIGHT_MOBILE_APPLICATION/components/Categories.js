import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import client, { urlFor } from '../sanity';

const Categories = () => {

    const [categories,setCategories] = useState([]);

   useEffect(()=>
   {
    client.fetch(`*[_type == "category"]`).then((data) =>{
      setCategories(data)
    })
   },[])

  return (
    <ScrollView contentContainerStyle={
        {
            paddingHorizontal: 15,
            paddingTop: 10,
        }
    }
    horizontal 
    showsHorizontalScrollIndicator={false}
    >

      {categories.map((e)=>(
        <CategoryCard key={e._id} imgUrl={urlFor(e.image).width(200).url()} title={e.name}/>
      ))}
     {/* <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Testing"/>
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Testing"/>
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Testing"/>
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Testing"/>
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Testing"/>
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Testing"/>  */}
   </ScrollView>
  )
}

export default Categories