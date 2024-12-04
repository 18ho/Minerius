import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio-without-node-native';

export const NewsWidget = () => {
    const [articles, setArticles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const CLIENT_ID = 'naWXRHQV80uun72rheB_';
    const CLIENT_SECRET = '5bjai5Is5m';
    const BASE_URL = 'https://openapi.naver.com/v1/search/news.json';

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(BASE_URL, {
                    params: {
                        query: '날씨',
                        display: 2,
                        sort: 'date'
                    },
                    headers: {
                        'X-Naver-Client-Id': CLIENT_ID,
                        'X-Naver-Client-Secret': CLIENT_SECRET
                    }
                });

                const articlesData = response.data.items;
                setArticles(articlesData);

                const fetchImages = async () => {
                    const images = await Promise.all(
                        articlesData.map(async (article) => {
                            try {
                                const articleResponse = await axios.get(article.link);
                                const htmlString = articleResponse.data;

                                const $ = cheerio.load(htmlString);

                                const content = $('article') || $('.content') || $('.article-body');

                                if (!content.length) {
                                    return null;
                                }

                                const imgSrc = content.find('img').first().attr('src');

                                if (!imgSrc || imgSrc.startsWith('data:') || imgSrc.endsWith('.svg')) {
                                    return null;
                                }

                                return imgSrc;
                            } catch (error) {
                                console.error('Error fetching article image:', error);
                                return null;
                            }
                        })
                    );
                    setImageUrls(images);
                };

                fetchImages();
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    const handlePress = (link) => {
        Linking.openURL(link);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>뉴스 ></Text>
            <ScrollView style={styles.wrapper}>
                {articles.map((article, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.newsCard}
                        onPress={() => handlePress(article.link)}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>
                                    {article.title.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"')}
                                </Text>
                                <Text style={styles.subtitle}>
                                    {new Date().getHours() - (new Date(article.pubDate).getHours())} 시간 전
                                </Text>
                            </View>
                            {imageUrls[index] ? (
                                <Image
                                    source={{ uri: imageUrls[index] }}
                                    style={styles.image}
                                />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Text style={styles.noImageText}>이미지 없음</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    wrapper:{
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 10,
    },
    newsCard: {
        backgroundColor: '#F4F4F4',
        borderRadius: 0,
        marginLeft : 10,
        marginRight : 10,
        padding: 20,
        paddingTop: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    text: {
        color: '#A6A6A6',
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 8,
        paddingRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
    },
    image: {
        flex: 2,
        width: 80,
        height: 80,
        borderRadius: 5,
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        flex: 2,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
    },
    noImageText: {
        fontSize: 12,
        color: '#999',
    },
});

export default NewsWidget;