import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, Platform, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import Loading from '../components/loading';
import { image185, searchMovies } from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios? '':'mt-3';

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results,setResults] = useState([]);
    const [loading,setLoading] = useState(false);
    let movieName = "Avengers: Endgame";
    const handleSearch = (value) => {
        if(value && value.length > 2) {
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: "false",
                language: "en-US",
                page: "1",
            }).then((data) => {
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        }
        else {
            setLoading(false);
            setResults([]);
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch,400),[]);
    return (
        <SafeAreaView className="bg-neutral-800 flex-1"> 
            <View
                className={`mx-4 mb-3 flex-row justifiy-between items-center border border-neutral-500 rounded-full ${topMargin}`}
            >
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500"
                >
                    <XMarkIcon size="25" color="white"/>

                </TouchableOpacity>
            </View>
            { /* results */ }
            {
                loading? (
                    <Loading/>
                ):
                0 < results.length? (

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 15}}
                        className="space-y-3"
                    >
                        <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>   
                        <View className="flex-row justify-between flex-wrap">
                            {
                                results.map((item, index) => {
                                    return (
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => navigation.push("Movie", item)}
                                        >
                                            <View className="space-y-2 mb-4">
                                                <Image
                                                    className="rounded-3xl"
                                                    defaultSource={require("../assets/movie-placeholder.png")}
                                                    source={{uri: image185(item?.poster_path)}}
                                                    style={{ width: width*0.44, height: height*0.3 }}
                                                />
                                                <Text className="text-neutral-300 ml-1">
                                                    {
                                                        23 < item?.title?.length? item?.title?.slice(0,20)+"...": item?.title
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ):(
                    <View className="flex flex-col my-auto items-center">
                        <Image 
                            source={require("../assets/watch-movie.png")}
                            className="h-64 w-64"
                        />
                    </View>
                )
            }
        </SafeAreaView>
    )
}