import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f8eb',
  },
  rootView: {
    flex: 1,
    width: '100%',
    padding: 12,
    backgroundColor: '#f5f8eb',
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
    backgroundColor: '#10442C',
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
