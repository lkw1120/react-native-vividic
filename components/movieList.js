import { View, Text, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback, Dimensions } from "react-native";
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/moviedb";

var {width, height} = Dimensions.get('window')
export default function movieList({title, data, hideSeeAll}) {
    let movieName = "Avengers: Endgame";
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text} className="text-lg">See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            { /* movie row */ }
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal:15 }}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => {
                                    navigation.push('Movie',item);
                                }}
                            >
                                <View className="space-y-1 mr-4 items-center">
                                    <Image
                                        defaultSource={require("../assets/movie-placeholder.png")}
                                        source={{uri: image185(item.poster_path)}}
                                        className="rounded-3xl"
                                        style={{
                                            width: width*0.33,
                                            height: height*0.22
                                        }}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {
                                            18 < item.title?.length? item.title.slice(0,15)+"...":item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}