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
import imagemFundo from '../../assets/logo.jpg';
import {styles} from './style';

export default function Details(props) {
  const [comic, setComic] = useState([]);
  const [creators, setCreators] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const character = props.route.params.comic;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setName(character.name);
    setDescription(character.description);
    setImg(character.thumbnail.path);
    setLoading(false);
    console.log(character);
  }, []);

  return (
    <ImageBackground
      source={imagemFundo}
      style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#202020" barStyle="light-content" />
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{marginTop: 300}}
            color="#FFF"
          />
        ) : (
          <ScrollView style={styles.ViewTotal}>
            <Text numberOfLines={1} style={styles.TextTitle}>
              {name}
            </Text>
            <View style={styles.ViewImageInfo}>
              <Image
                style={{
                  flex: 1,
                  width: 230,
                  height: 310,
                  margin: 30,
                }}
                autoSize
                resizeMode="contain"
                source={{uri: img + '.jpg'}}
              />
            </View>
            <View style={styles.ViewTextDescription}>
              <Text style={styles.TextDescription}>
                {description ? description : <Text>Herói sem descrição!</Text>}
              </Text>
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
