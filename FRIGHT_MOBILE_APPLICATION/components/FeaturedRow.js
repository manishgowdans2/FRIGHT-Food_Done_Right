import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import sanityClient from '../sanity'
import { ArrowRightIcon } from 'react-native-heroicons/outline'

const FeaturedRow = ({id,title, description}) => {

  const [app,setApp] = useState([]);

  useEffect(()=>
  {
    sanityClient.fetch(`
    *[_type == "featured" && _id == $id ]
        {
            ...,
          app[]->{
            ...,
            
            dishes[]->,
type->{
  name
}
          }

}[0]
        
    `,{id}).then(data =>
      {
        setApp(data?.app);
      })
  },[] )



  return (
    <View>

    <View className="mt-4 flex-row items-center justify-between px-4">
      
    <Text className="font-bold text-lg">{title} </Text>
      <ArrowRightIcon color="#1266f7"/>
      
    </View> 
    <Text className="px-4">{description}</Text>

    <ScrollView horizontal contentContainerStyle={
        {
            paddingHorizontal:15,
        }
     }

     showHorizontalScrollIndicator={false}
     className="pt-4">

      
{app?.map(app=>
      (
        <Card 
        key={app._id} 
        id={app._id} 
        imgUrl={app.image} 
        title={app.name} 
        rating={app.rating}
         genre={app.type?.name}
          address={app.address} 
          short_description={app.short_description}
           dishes={app.dishes}
            long={app.long}
             lat={app.lat}/>


      ))}

{/* <Card id={123} imgUrl="http://links.papareact.com/gn7" title="Hola" rating={4.5} genre="Indian" address="Here only" short_description="Wow" dishes={[]} long={20} lat={0}/>

        
<Card id={123} imgUrl="http://links.papareact.com/gn7" title="Hola" rating={4.5} genre="Indian" address="Here only" short_description="Wow" dishes={[]} long={20} lat={0}/>



<Card id={123} imgUrl="http://links.papareact.com/gn7" title="Hola" rating={4.5} genre="Indian" address="Here only" short_description="Wow" dishes={[]} long={20} lat={0}/>



<Card id={123} imgUrl="http://links.papareact.com/gn7" title="Hola" rating={4.5} genre="Indian" address="Here only" short_description="Wow" dishes={[]} long={20} lat={0}/>


<Card id={123} imgUrl="http://links.papareact.com/gn7" title="Hola" rating={4.5} genre="Indian" address="Here only" short_description="Wow" dishes={[]} long={20} lat={0}/>  */}

</ScrollView>

</View>

  )
}

export default FeaturedRow