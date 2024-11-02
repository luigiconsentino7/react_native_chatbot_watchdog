import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import uuid from 'react-native-uuid'
import OpenAI from 'openai'
import { OPENAI_API_KEY } from '@env'
import Markdown from 'react-native-markdown-display';

// const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// const error = console.error;
// console.error = (...args) => { if(/defaultProps/.test(args[0])) return; error(...args); }

export function ChatScreen() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
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
//           avatar: 'https://placeimg.com/140/140/any',
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
        lineHeight: 20,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
      }}>
        {currentMessage.text}
      </Markdown>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderMessageText={CustomMessageText}
        isTyping={isTyping}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
    },
  });

export default ChatScreen;