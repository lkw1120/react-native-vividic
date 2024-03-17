import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window')
export default function trendingMovies({data}) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate("Movie", item);
    }
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">
                Trending
            </Text>
            <Carousel 
                data={data}
                renderItem={({item}) => <MovieItem item={item} handleClick={handleClick} /> }
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width*0.62}
                slideStyle={{ display:'flex', alignItems:'center' }}
            />
        </View>
    )
}
const MovieItem = ({item, handleClick}) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image 
                className="rounded-3xl"
                defaultSource={require("../assets/movie-placeholder.png")}
                source={{uri: image500(item.poster_path)}}
                style={{
                    width: width*0.6,
                    height: height*0.4
                }}
            />
        </TouchableWithoutFeedback>
    )
}
