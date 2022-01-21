import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  header: {
    height: 90,
    backgroundColor: '#e61919',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e61919',
    borderLeftColor: '#e61919',
    borderRightColor: '#e61919',
    borderTopColor: '#e61919',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  marvelLogo: {
    marginTop: 0,
    height: 100,
  },
  body: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 30,
  },
  carousel: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  ViewInputFilter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 5,
    height: 60,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1.5,
      width: 1,
    },
  },
  ViewInput: {
    flex: 1,
    paddingHorizontal: 15,
    height: 46,
    backgroundColor: '#eee',

    fontWeight: 'bold',

    borderRadius: 23,
    borderColor: '#707070',
    borderStyle: 'solid',
    borderWidth: 2,

    flexDirection: 'row',
    alignItems: 'center',

    marginRight: 7,
  },
  InputPesquisa: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: '#333',
  },
  ListFilters: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackGroundItensFilter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  BackGroundItensFilterCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 15,
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginLeft: 30,
    marginRight: 30,
  },
  ItensFilter: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  ViewComics: {
    flex: 1,
    backgroundColor: '#eee',
  },
  ViewComicsList: {
    padding: 3,
  },
  Comics: {
    width: 80,
    height: 240,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#333',
  },
  TextTitleComic: {
    width: 120,
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
  ViewLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
