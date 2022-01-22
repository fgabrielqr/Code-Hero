import React, {useEffect, useState} from 'react';
import Carousel from 'react-native-banner-carousel';
import {
  Dimensions,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  RefreshControl,
  LogBox,
} from 'react-native';
import api from '../../services/api';
import Ico from 'react-native-vector-icons/MaterialIcons';
import marvelLogo from '../../assets/logo.png';
import animation from '../../assets/animation.gif';
import {styles} from './style';

export default function Home({navigation}) {
  const [characters, setCharacters] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [arrayholder, setArrayholder] = useState();
  const [search, setSearch] = useState();
  const [name, setName] = useState();
  // recarrega dados
  async function reLoad() {
    try {
      const response = await api.get(
        name
          ? `/v1/public/characters?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8&nameStartsWith=${name}`
          : '/v1/public/characters?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8',
      );

      setArrayholder(response.data.data.results);
      setCharacters(response.data.data.results);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {}
  }
  // load dados inicial
  useEffect(() => {
    async function loadProviders() {
      try {
        const response = await api.get(
          name
            ? `/v1/public/characters?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8&nameStartsWith=${name}`
            : '/v1/public/characters?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8',
        );

        setArrayholder(response.data.data.results);
        setSearch(response.data.data.results);
        pararLoading();
        setRefreshing(false);
      } catch (error) {}
    }
    loadProviders();
  }, [name]);

  // Pesquisa
  useEffect(() => {
    function setaSearch() {
      setCharacters(search);
    }
    setaSearch();
  }, [search]);

  // atrazo no loading
  setTimeout(function pararLoading() {
    setLoading(false);
  }, 2000);

  // refresh ao puxar para baixo
  function onRefresh() {
    setRefreshing(true);
    reLoad();
  }

  //  filtra pelo text input
  function searchFilterFunction(text) {
    setName(text);
  }

  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 230;
  const images = [
    'https://cdn.vox-cdn.com/thumbor/VjcIB4vAK8n3O8j8Yf_sGIWdngA=/0x0:1836x1197/1200x800/filters:focal(741x165:1033x457)/cdn.vox-cdn.com/uploads/chorus_image/image/63935579/marvel.0.1430832763.0.jpg',
    'https://multiversonoticias.com.br/wp-content/uploads/2021/09/TOP-5-MELHORES-FILMES-MARVEL.jpg',
    'https://oxentesensei.com.br/wp-content/uploads/2021/03/marvel-comics-capa.jpg ',
  ];

  function renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{width: BannerWidth, height: BannerHeight}}
          source={{uri: image}}
        />
      </View>
    );
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#e61919" barStyle="light-content" />
      <View style={styles.header}>
        <Image
          style={styles.marvelLogo}
          source={marvelLogo}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.carousel}>
          <Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={BannerWidth}>
            {images.map((image, index) => renderPage(image, index))}
          </Carousel>
        </View>
        <View style={styles.ViewInputFilter}>
          <View style={styles.ViewInput}>
            <Ico size={20} name="search" color="#727171" />
            <TextInput
              style={styles.InputPesquisa}
              placeholder="Pesquisar..."
              autoCapitalize="none"
              onChangeText={text => searchFilterFunction(text)}
            />
          </View>
        </View>
        {show ? <View style={styles.ListFilters}></View> : null}
        <View style={styles.ViewComics}>
          {loading ? (
            <View style={styles.ViewLoading}>
              <Image
                source={animation}
                style={{height: 300, width: 300}}
                color="#333"
              />
            </View>
          ) : (
            <FlatList
              numColumns={2}
              style={styles.ViewComicsList}
              data={characters}
              key={characters}
              keyExtractor={item => String(item.name)}
              renderItem={({item: comic}) => (
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    borderRadius: 4,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Details', {comic})}>
                    <Image
                      style={{
                        height: 150,
                        flex: 1,
                        borderRadius: 4,
                      }}
                      autoSize
                      resizeMode="cover"
                      source={{uri: comic.thumbnail.path + '.jpg'}}
                    />
                  </TouchableOpacity>
                  <Text numberOfLines={1} style={styles.TextTitleComic}>
                    {comic.name}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
