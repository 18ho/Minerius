import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Linking } from 'react-native';
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
                        display: 5,
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
        <ScrollView>
            {articles.map((article, index) => (
                <View style={{ margin: 20 }} key={index}>
                    <TouchableOpacity onPress={() => handlePress(article.link)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 8, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {article.title.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"')}
                                </Text>
                                <Text>{new Date().getHours() - (new Date(article.pubDate).getHours())} 시간 전</Text>
                            </View>
                            {imageUrls[index] ? (
                                <View style={{ flex: 2, width: 80, height: 80 }}>
                                    <Image
                                        source={{ uri: imageUrls[index] }}
                                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                    />
                                </View>
                            ) : (
                                <Text>이미지가 없습니다.</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default NewsWidget;

