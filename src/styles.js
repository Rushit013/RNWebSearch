import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%',
  },
  rootView: {
    flex: 1,
    width: '100%',
    padding: 12,
    backgroundColor: 'white',
  },
  searchHeader: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchInputContainer: {
    height: 40,
    flex: 1,
    borderWidth: 1,
  },
  searchTextInput: {
    height: 40,
    width: '100%',
    flex: 1,
    backgroundColor: '#ccc',
  },
  headerActionContainer: {
    width: 80,
    height: 45,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nextButtonContainer: {
    backgroundColor: 'black',
    height: 40,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  nextButtonLabel: {
    fontSize: 16,
    text: 'center',
    fontWeight: 'bold',
    padding: 8,
  },
});

export default styles;
