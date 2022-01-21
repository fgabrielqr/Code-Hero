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
} from 'react-native';
import api from '../../services/api';
import Ico from 'react-native-vector-icons/MaterialIcons';
import marvelLogo from '../../assets/logo.png';
import IcoFilter from '../../assets/filter-icon.png';
import animation from '../../assets/animation.gif';
import {styles} from './style';

export default function Home({navigation}) {
  const [comics, setComics] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [arrayholder, setArrayholder] = useState();
  const [search, setSearch] = useState();

  // recarrega dados
  async function reLoad() {
    const response = await api.get('/v1/public/characters');

    setArrayholder(response.data.data.results);
    setComics(response.data.data.results);
    setLoading(false);
    setRefreshing(false);
  }

  // mostra ou esconde botoes
  function ShowHideComponent() {
    if (show == true) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  // load dados inicial
  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('/v1/public/characters');

      setArrayholder(response.data.data.results);
      setSearch(response.data.data.results);
      pararLoading();
      setRefreshing(false);
    }
    loadProviders();
  }, []);

  // Pesquisa
  useEffect(() => {
    function setaSearch() {
      setComics(search);
    }
    setaSearch();
  }, [search]);

  // atrazo no loading
  setTimeout(function pararLoading() {
    setLoading(false);
  }, 5000);

  // refresh ao puxar para baixo
  function onRefresh() {
    setRefreshing(true);
    reLoad();
  }

  //  filtra pelo text input
  function searchFilterFunction(text) {
    console.log(arrayholder);
    const newData = arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setSearch(newData);
  }

  // filtra botao Title
  function searchBtnFilterTitle() {
    // array temporário que armazena os objetos com o índice e o valor para ordenação
    var mapped = search.map(function (el, i) {
      return {index: i, value: el.title.toLowerCase()};
    });

    // ordenando o array mapeado contendo os dados resumidos
    mapped.sort(function (a, b) {
      return +(a.value > b.value) || +(a.value === b.value) - 1;
    });

    // containerpara o resultado ordenado
    var result = mapped.map(function (el) {
      return search[el.index];
    });
    console.log(result);
    setComics(result);
  }

  // filtra botao Title
  function searchBtnFilterIssue() {
    // array temporário que armazena os objetos com o índice e o valor para ordenação
    var mapped = search.map(function (el, i) {
      return {index: i, value: el};
    });

    // ordenando o array mapeado contendo os dados resumidos
    mapped.sort(function (a, b) {
      return +(a.value > b.value) || +(a.value === b.value) - 1;
    });

    // containerpara o resultado ordenado
    var result = mapped.map(function (el) {
      return search[el.index];
    });
    console.log(result);
    setComics(result);
  }

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
          <TouchableOpacity onPress={ShowHideComponent}>
            <Image
              style={{width: 30, height: 30}}
              name="imgFilter"
              source={IcoFilter}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        {show ? (
          <View style={styles.ListFilters}>
            <TouchableOpacity onPress={() => searchBtnFilterTitle()}>
              <View style={styles.BackGroundItensFilter}>
                <Text style={styles.ItensFilter}>Título</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => searchBtnFilterIssue()}>
              <View style={styles.BackGroundItensFilterCenter}>
                <Text style={styles.ItensFilter}>Número</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.ViewComics}>
          {/* <Text style={styles.TextViewComics}>Lançamento</Text> */}

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
              showsVerticalScrollIndicator={false}
              horizontal={false}
              numColumns={3}
              style={styles.ViewComicsList}
              data={comics}
              //key={comics.title}
              keyExtractor={item => String(item.title)}
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
                    {comic.title}
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
