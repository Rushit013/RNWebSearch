import React from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

import {WebView} from 'react-native-webview';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
  }

  onSearchText = text => {
    this.setState({searchText: text}, () => {
      if (text) {
        const run = `searchKeyword("${text}")`;
        this.webviewRef.injectJavaScript(run);
      } else {
        const run = `unmark()`;
        this.webviewRef.injectJavaScript(run);
      }
    });
  };

  onNextPress = () => {
    const run = `focusNext()`;
    this.webviewRef.injectJavaScript(run);
  };

  onPreviousPress = () => {
    const run = `focusPrevious()`;
    this.webviewRef.injectJavaScript(run);
  };

  render() {
    const {searchText} = this.state;
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.rootView}>
          <View style={styles.searchHeader}>
            <View style={styles.searchInputContainer}>
              <TextInput
                placeholder="Enter value"
                value={searchText}
                style={{flex: 1, width: '100%', paddingHorizontal: 8}}
                onChangeText={this.onSearchText}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 5,
              }}>
              <View style={styles.headerActionContainer}>
                <TouchableOpacity
                  style={styles.nextButtonContainer}
                  activeOpacity={0.7}
                  onPress={() => this.onNextPress()}>
                  <Text style={styles.nextButtonText}>next</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headerActionContainer}>
                <TouchableOpacity
                  style={styles.nextButtonContainer}
                  activeOpacity={0.7}
                  onPress={() => this.onPreviousPress()}>
                  <Text style={styles.nextButtonText}>previous</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <WebView
            ref={ref => (this.webviewRef = ref)}
            decelerationRate={'fast'}
            originWhitelist={['*']}
            customStyle={`* {
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
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                            :root {
                              --padding: 21px;
                              --bg-color: #f5f8eb;
                              --text-color: #0a643a;
                              --accent-color: #a0bb2e;
                              --font-family: 'Noticia Text';
                              --font-display: 'Lalezar';
                            }

                            html {
                              margin: 0;
                              padding: 0;
                            }

                            body {
                              margin: 0 auto;
                              padding: var(--padding);
                              color: var(--text-color);
                              background: var(--bg-color);
                              font-family: var(--font-family);
                              line-height: 2;
                            }
                      
                            h2 {
                              font-size: 180%;
                              transform: translateX(-5px);
                              font-family: var(--font-display);
                              margin-bottom: 0;
                            }
                      
                            a {
                              color: var(--text-color);
                            }
                      
                            p {
                              margin-bottom: 2em;
                            }
                      
                            strong {
                              display: inline-block;
                              transform: translateX(-5px);
                              font-size: 130%;
                              line-height: 1;
                              font-family: var(--font-display);
                            }
                      
                            strong:before {
                              content: '🎙️';
                              margin-right: 5px;
                              margin-top: 34px;
                              display: inline-block;
                            }
                      
                            h2:after {
                              content: '';
                              display: block;
                              height: 8px;
                              background: var(--accent-color);
                              max-width: 55px;
                              transform: skewX(-21deg) translateY(-13px);
                              border-radius: 3px;
                            }

                                mark {
                                    background: yellow;
                                }

                                mark.current {
                                    background: orange;
                                }
                            </style>
                        </head>

                        <body>
                            <div id="content" style="width: 100%">

                            <h1 style="font-size:24px;font-weight:700;color:#24292e;letter-spacing:-1px;opacity:1;text-align:center;margin:auto;max-width:650px">React-native Search Keywords Within WebView</h1>
                            <h3 style="font-size:18px;color:#24292e;font-weight:400;text-align:center;letter-spacing:0px;margin:auto;max-width:550px;padding-bottom:10px;margin-top:5px">Works with all the language</h3>
                            
                            <img src="https://translated-into.com/blog/the-impact-of-language-on-character-development-in-literature.png" style="width: 100%">

                            <h2>English</h2>
                            <p>
                            Language is the primary tool used by writers to convey their ideas, emotions, and stories to their readers. In literature, language is used to create characters that are complex and multidimensional. The way a character speaks, the words they use, and the sentence structure all play a role in defining their personality, motivations, and experiences.
                            </p>

                            <h2>Arabic</h2>
                            <p>
                            اللغة هي الأداة الأساسية التي يستخدمها الكتاب لنقل أفكارهم وعواطفهم وقصصهم لقرائهم. في الأدب ، تُستخدم اللغة لإنشاء شخصيات معقدة ومتعددة الأبعاد. تلعب الطريقة التي تتحدث بها الشخصية والكلمات التي يستخدمونها وبنية الجملة دورًا في تحديد شخصيتهم ودوافعهم وخبراتهم.
                            </p>

                            <h2>French</h2>
                            <p>
                            La langue est le principal outil utilisé par les écrivains pour transmettre leurs idées, leurs émotions et leurs histoires à leurs lecteurs. En littérature, le langage est utilisé pour créer des personnages complexes et multidimensionnels. La façon dont un personnage parle, les mots qu'il utilise et la structure de la phrase jouent tous un rôle dans la définition de sa personnalité, de ses motivations et de ses expériences.
                            </p>

                            <h2>Spanish</h2>
                            <p>
                            El lenguaje es la principal herramienta utilizada por los escritores para transmitir sus ideas, emociones e historias a sus lectores. En la literatura, el lenguaje se utiliza para crear personajes que son complejos y multidimensionales. La forma en que habla un personaje, las palabras que usa y la estructura de la oración juegan un papel en la definición de su personalidad, motivaciones y experiencias.
                            </p>

                            <h2>Portuguese</h2>
                            <p>
                            A linguagem é a principal ferramenta usada pelos escritores para transmitir suas ideias, emoções e histórias aos seus leitores. Na literatura, a linguagem é usada para criar personagens complexos e multidimensionais. A maneira como um personagem fala, as palavras que ele usa e a estrutura da frase desempenham um papel na definição de sua personalidade, motivações e experiências.
                            </p>

                            <h2>German</h2>
                            <p>
                            Sprache ist das wichtigste Werkzeug, mit dem Schriftsteller ihren Lesern ihre Ideen, Gefühle und Geschichten vermitteln. In der Literatur wird Sprache verwendet, um komplexe und mehrdimensionale Charaktere zu schaffen. Die Art und Weise, wie eine Figur spricht, die von ihr verwendeten Wörter und die Satzstruktur spielen alle eine Rolle bei der Definition ihrer Persönlichkeit, Motivationen und Erfahrungen.
                            </p>

                            <h2>Italian</h2>
                            <p>
                            La lingua è lo strumento principale utilizzato dagli scrittori per trasmettere le loro idee, emozioni e storie ai loro lettori. In letteratura, il linguaggio viene utilizzato per creare personaggi complessi e multidimensionali. Il modo in cui un personaggio parla, le parole che usa e la struttura della frase giocano tutti un ruolo nel definire la sua personalità, le motivazioni e le esperienze.
                            </p>

                            <h2>Russian</h2>
                            <p>
                            Язык является основным инструментом, используемым писателями для передачи своих идей, эмоций и историй своим читателям. В литературе язык используется для создания сложных и многомерных персонажей. То, как персонаж говорит, слова, которые он использует, и структура предложения — все это играет роль в определении его личности, мотивации и опыта.
                            </p>

                            <h2>Vietnamese</h2>
                            <p>
                            Ngôn ngữ là công cụ chính được các nhà văn sử dụng để truyền đạt ý tưởng, cảm xúc và câu chuyện của họ tới độc giả. Trong văn học, ngôn ngữ được sử dụng để tạo ra các nhân vật phức tạp và đa chiều. Cách một nhân vật nói, những từ họ sử dụng và cấu trúc câu đều đóng một vai trò trong việc xác định tính cách, động cơ và kinh nghiệm của họ.
                            </p>

                            <h2>Turkish</h2>
                            <p>
                            Dil, yazarların fikirlerini, duygularını ve hikayelerini okuyucularına iletmek için kullandıkları birincil araçtır. Edebiyatta dil, karmaşık ve çok boyutlu karakterler yaratmak için kullanılır. Bir karakterin konuşma şekli, kullandığı kelimeler ve cümle yapısı, kişiliklerini, motivasyonlarını ve deneyimlerini tanımlamada rol oynar.
                            </p>

                         
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
                                    iframes: true,
                                    done: function () {
                                        $content.mark(searchVal, {
                                            iframes: true,
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

                            function focusPrevious() {
                                if ($results.length) {
                                    console.log("length =", $results.length)
                                    currentIndex -= 1;
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
                        `,
            }}
            scalesPageToFit={true}
            viewportContent={
              'width=device-width, user-scalable=no, initial-scale=1'
            }
            startInLoadingState={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}
