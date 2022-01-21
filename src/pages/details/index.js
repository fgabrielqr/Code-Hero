import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import imagemFundo from '../../assets/logo.jpg';
import marvelLogo from '../../assets/marvel-logo.png';
import {styles} from './style';

export default function Details({navigation}) {
  const [characters, setCharacters] = useState([]);
  const [creators, setCreators] = useState([]);
  const character = navigation.getParam('characters');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComic() {
      const response = await api.get(
        `/v1/public/characters/${character.id}?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8`,
      );
      const responseCreators = await api.get(
        `/v1/public/characters/${character.id}/creators?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8`,
      );

      setCharacters(response.data.data.results);
      setCreators(responseCreators.data.data.results);
      setLoading(false);
    }
    loadComic();
  }, []);

  return (
    <ImageBackground
      source={imagemFundo}
      style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#202020" barStyle="light-content" />
        <View style={styles.header}>
          <Image
            style={styles.marvelLogo}
            source={marvelLogo}
            resizeMode="contain"
          />
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{marginTop: 300}}
            color="#FFF"
          />
        ) : (
          <ScrollView style={styles.ViewTotal}>
            {characters.map(provider => (
              <Text key={provider} numberOfLines={1} style={styles.TextTitle}>
                {provider.name}
              </Text>
            ))}
            <View style={styles.ViewImageInfo}>
              {characters.map(provider => (
                <Image
                  style={{
                    flex: 1,
                    width: 230,
                    height: 310,
                    margin: 30,
                  }}
                  autoSize
                  resizeMode="contain"
                  source={{uri: provider.thumbnail.path + '.jpg'}}
                />
              ))}
              <View style={styles.ViewTextInfo}>
                <Text style={styles.TextTitle2}>Writer:</Text>
                {creators.map(provider => (
                  <Text style={{color: '#FFF', fontSize: 14}}>
                    {provider.firstName}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.ViewTextDescription}>
              {characters.map(provider => (
                <Text style={styles.TextDescription}>
                  {provider.description}
                </Text>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}

Details.navigationOptions = ({navigation}) => ({
  name: '',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Home');
      }}>
      <Icon name="chevron-left" size={40} color="#FFF" style={{marginTop: 6}} />
    </TouchableOpacity>
  ),
});
