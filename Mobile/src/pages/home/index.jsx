import React, { Fragment, useContext } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    ImageBackground,
    StatusBar,
    Image,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { style } from './styles';
import HeaderBackground from '../../assets/main/headerBackground.png';
import AlexBracken from '../../assets/main/alexBracken.png';
import CategoryIcon from '../../assets/main/categoryIcon.png';
import ProductImage from '../../assets/main/productImage.png';

export default function Home() {
    const navigation = useNavigation();

    return (
        <Fragment>
            <StatusBar backgroundColor="#FF7A7A" barStyle="light-content" />
            <View style={{ flex: 1 }}>
                {/* Header */}
                <ImageBackground
                    source={HeaderBackground}
                    style={style.headerBackground}
                    imageStyle={{ resizeMode: 'stretch' }}
                >
                    <Text style={style.headerTitle}>Meu Feed</Text>
                    <Text style={style.headerDescription}>
                        Veja o que seus amigos desejam comprar e os presenteei
                    </Text>
                </ImageBackground>
                {/* Posts */}
                <View style={style.postContainer}>
                    {/* PostTitle */}
                    <View style={style.postDescriptionContainer}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('HomeScreen', {
                                    screen: 'AnotherProfile',
                                })
                            }
                        >
                            <Image
                                source={AlexBracken}
                                style={style.userImage}
                            />
                        </TouchableOpacity>
                        <Text style={style.postDescription}>
                            Alex Bracken adicionou um novo item na lista de
                            desejos
                        </Text>
                    </View>
                    {/* ProductContainer */}
                    <View style={style.productContainer}>
                        <View>
                            <View style={style.categoryContainer}>
                                <Image
                                    source={CategoryIcon}
                                    style={style.categoryIcon}
                                />
                                <Text style={style.categoryText}>Livro</Text>
                            </View>
                            <Text style={style.productText}>
                                Neurociência Para Leigos
                            </Text>
                            <View style={style.buttonsContainer}>
                                <TouchableOpacity>
                                    <FontAwesome
                                        name="heart-o"
                                        size={20}
                                        color="white"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={style.messageContainer}
                                >
                                    <Feather
                                        name="message-circle"
                                        size={20}
                                        color="white"
                                    />
                                    <Text style={style.messageCount}>10</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={style.giveGiftContainer}
                                >
                                    <AntDesign
                                        name="checkcircleo"
                                        size={20}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={style.productImageContainer}>
                            <Image
                                source={ProductImage}
                                style={style.productImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Fragment>
    );
    // }
}