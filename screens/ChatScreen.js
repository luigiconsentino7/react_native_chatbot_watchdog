import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import uuid from 'react-native-uuid'
import { launchImageLibrary } from 'react-native-image-picker'
import OpenAI from 'openai'
import { OPENAI_API_KEY } from '@env'
import Markdown from 'react-native-markdown-display';
import logowatchdog from '../assets/images/logowatchdog.png'

// const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// const error = console.error;
// console.error = (...args) => { if(/defaultProps/.test(args[0])) return; error(...args); }

export function ChatScreen() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: logowatchdog
        },
      },
    ])
  }, [])

// const test = async (userMessage) => {
//     try {
//       setIsTyping(true);
//       const completion = await openai.chat.completions.create({
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: userMessage }
//         ],
//         model: "gpt-4o-mini",
//       });
  
//       const aiMessage = completion.choices[0].message.content;
//       const newMessage = {
//         _id: uuid.v4(),
//         text: aiMessage,
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'WatchDog Chat',
//         },
//       };
  
//       setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsTyping(false);
//     }
//   }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    setText('')
  }, [])

  const CustomMessageText = (props) => {
    const { currentMessage } = props;
    const textColor = currentMessage.user._id === 1 ? "white" : "black";

    return (
      <Markdown style={{
        body: {
          marginHorizontal: 10,
          fontSize: 16,
          color: textColor,
        },
      }}>
        {currentMessage.text}
      </Markdown>
    )
  }

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel || response.error) {
        console.log('Seleção de imagem cancelada ou falhou');
      } else {
        const source = { uri: response.assets[0].uri };
        const newMessage = {
          _id: uuid.v4(),
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          image: source.uri,
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
      }
    });
  };

  const renderInputToolbar = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Digite uma mensagem..."
        value={text}
        onChangeText={setText}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={() => onSend([{ text, _id: uuid.v4(), createdAt: new Date(), user: { _id: 1 } }])} style={styles.sendButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/filled-sent.png' }}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleImagePick} style={styles.imageButton}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/gallery.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderMessageText={CustomMessageText}
        renderInputToolbar={renderInputToolbar}
        isTyping={isTyping}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 0,
    borderColor: 'transparent',
    outlineStyle: 'none',
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default ChatScreen;