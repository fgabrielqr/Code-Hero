import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    height: 90,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#707070',
    borderLeftColor: '#202020',
    borderRightColor: '#202020',
    borderTopColor: '#202020',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  marvelLogo: {
    marginTop: 25,
    height: 40,
  },
  ViewTotal: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  TextTitle: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  },
  TextTitle2: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  ViewImageInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ViewTextInfo: {
    width: 80,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  TextoDescricao: {
    fontSize: 13,
    color: '#FFF',
  },
  ViewTextDescription: {
    flex: 1,
  },
  TextDescription: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 10,
  },
});
