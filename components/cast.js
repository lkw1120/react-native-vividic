import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { image185 } from '../api/moviedb';

export default function Cast({cast, navigation}) {
    let personName = "Robert Downey Junior"
    let charactorName = "Tony Stark"
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}>
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="mr-4 items-center"
                                onPress={() => navigation.navigate('Person', person)}
                            >

                                <View
                                    className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                                    <Image
                                        className="rounded-2xl h-24 w-20"
                                        defaultSource={require("../assets/profile-placeholder.png")}
                                        source={{uri: image185(person?.profile_path)}}/>
                                </View>
                                <Text className="text-white text-xs mt-1">
                                    {
                                        10 < person?.character?.length? person?.character?.slice(0,10)+"...": person?.character
                                    }
                                </Text>
                                <Text className="text-neutral-400 text-xs mt-1">
                                    {
                                        10 < person?.name?.length? person?.name?.slice(0,10)+"...": person?.name
                                    }
                                </Text>
                                
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}