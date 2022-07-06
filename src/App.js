import React from 'react';
import { SafeAreaView, TextInput, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

import AutoHeightWebView from 'react-native-autoheight-webview';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        }
    }

    onSearchText = (text) => {
        this.setState({ searchText: text }, () => {
            if (text) {
                const run = `searchKeyword("${text}")`;
                this.webviewRef.injectJavaScript(run)
            } else {
                const run = `unmark()`;
                this.webviewRef.injectJavaScript(run)
            }
        })
    }

    onNextPress = () => {
        const run = `focusNext()`;
        this.webviewRef.injectJavaScript(run)
    }

    render() {
        const { searchText } = this.state;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootView}>
                    <View style={styles.searchHeader}>
                        <View style={styles.searchInputContainer}>
                            <TextInput
                                placeholder='Enter value'
                                value={searchText}
                                style={{ flex: 1, width: '100%' }}
                                onChangeText={this.onSearchText}
                            />
                        </View>
                        <View style={styles.headerActionContainer}>
                            <TouchableOpacity style={styles.nextButtonContainer} activeOpacity={0.7} onPress={() => this.onNextPress()}>
                                <Text style={styles.nextButtonText}>next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <AutoHeightWebView
                        ref={(ref) => this.webviewRef = ref}
                        decelerationRate={'fast'}
                        originWhitelist={['*']}
                        customStyle={`
                                * {
                                    font-family: 'Times New Roman';
                                }
                                p {
                                    font-size: 16px;
                                }
                                `}
                        onSizeUpdated={size => console.log(size.height)}
                        source={{
                            html: `
                        <!DOCTYPE html>
                        <html>

                        <head>
                            <style>
                                mark {
                                    background: yellow;
                                }

                                mark.current {
                                    background: orange;
                                }
                            </style>
                        </head>

                        <body>
                            <div id="content" style="width: 92%">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type 
                            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the 
                            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s 
                            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                            publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                            <br /><br />
                            Dans l'arrière-pays de Provence, à 30 kilomètres au sud-ouest de Draguignan, l'Abbaye du Thoronet est 
                            un chef-d'œuvre de l'art roman provençal.
                            
                            <br /><br />
                            Maître Corbeau, sur un arbre perché,
                            Tenait en son bec un fromage.
                            Maître Renard, par l’odeur alléché,
                            Lui tint à peu près ce langage :
                            « Hé ! bonjour, Monsieur du Corbeau.
                            Que vous êtes joli ! Que vous me semblez beau !
                            Sans mentir, si votre ramage
                            Se rapporte à votre plumage,
                            Vous êtes le Phénix des hôtes de ces bois. »
                            A ces mots le Corbeau ne se sent pas de joie ;
                            Et pour montrer sa belle voix,
                            Il ouvre un large bec, laisse tomber sa proie.
                            Le Renard s’en saisit, et dit : « Mon bon Monsieur,
                            Apprenez que tout flatteur
                            Vit aux dépens de celui qui l’écoute :
                            Cette leçon vaut bien un fromage, sans doute. »
                            Le Corbeau, honteux et confus,
                            Jura, mais un peu tard, qu’on ne l’y prendrait plus.

                            <br /><br />
                            1. Jeder hat das Recht auf Bildung. Die Bildung ist unentgeltlich, zum mindesten der Grundschulunterricht und die grundlegende Bildung. Der Grundschulunterricht ist obligatorisch. Fach- und Berufsschulunterricht müssen allgemein verfügbar gemacht werden, und der Hochschulunterricht muß allen gleichermaßen entsprechend ihren Fähigkeiten offenstehen.
                            <br /><br />
                            2. Die Bildung muß auf die volle Entfaltung der menschlichen Persönlichkeit und auf die Stärkung der Achtung vor den Menschenrechten und Grundfreiheiten gerichtet sein. Sie muß zu Verständnis, Toleranz und Freundschaft zwischen allen Nationen und allen rassischen oder religiösen Gruppen beitragen und der Tätigkeit der Vereinten Nationen für die Wahrung des Friedens förderlich sein.
                            <br /><br />
                            3. Die Eltern haben ein vorrangiges Recht, die Art der Bildung zu wählen, die ihren Kindern zuteil werden soll.
                            </div>
                        </body>

                        </html>

                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
                        <script src="https://cdn.jsdelivr.net/g/jquery@3.1.0,mark.js@8.6.0(jquery.mark.min.js)" charset="UTF-8"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js" charset="UTF-8"></script>
                        <script>
                            var $input = $("input[type='search']"),
                                // clear button
                                $clearBtn = $("button[data-search='clear']"),
                                // prev button
                                $prevBtn = $("button[data-search='prev']"),
                                // next button
                                $nextBtn = $("button[data-search='next']"),
                                // the context where to search
                                $content = $("#content"),
                                // jQuery object to save <mark> elements
                                $results,
                                // the class that will be appended to the current
                                // focused element
                                currentClass = "current",
                                // top offset for the jump (the search bar)
                                offsetTop = 50,
                                // the current index of the focused element
                                currentIndex = 0;

                            function searchKeyword(keyword) {
                                var searchVal = keyword;
                                $content.unmark({
                                    done: function () {
                                        $content.mark(searchVal, {
                                            separateWordSearch: true,
                                            done: function () {
                                                $results = $content.find("mark");
                                                currentIndex = 0;
                                                jumpTo();
                                            }
                                        });
                                    }
                                });
                            }

                            function jumpTo() {
                                if ($results.length) {
                                    var position,
                                        $current = $results.eq(currentIndex);
                                    $results.removeClass(currentClass);
                                    if ($current.length) {
                                        $current.addClass(currentClass);
                                        position = $current.offset().top - offsetTop;
                                        window.scrollTo(0, position);
                                    }
                                }
                            }

                            function focusNext() {
                                if ($results.length) {
                                    console.log("length =", $results.length)
                                    currentIndex += 1;
                                    if (currentIndex < 0) {
                                        currentIndex = $results.length - 1;
                                    }
                                    if (currentIndex > $results.length - 1) {
                                        currentIndex = 0;
                                    }
                                    jumpTo();
                                }
                            }

                            function unmark() {
                                var instance = new Mark('#content');
                                instance.unmark()
                            }
                        </script>
                        ` }}
                        scalesPageToFit={true}
                        viewportContent={'width=device-width, user-scalable=no, initial-scale=1'}
                        startInLoadingState={true}
                    />
                </View>
            </SafeAreaView>
        )
    }
}