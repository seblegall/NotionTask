import {Button, Surface, Stack} from '@react-native-material/core';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Client} from '@notionhq/client';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NewTask} from './src/task/task';

const App = () => {
  console.log('app is starting');

  const isDarkMode = useColorScheme() === 'dark';

  const [taskTitle, setTaskTitle] = React.useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const notion = new Client({
    auth: 'secret_39galKst0qDnai4DqB9CI3kd0BEyuj9DOdyN3SX869U',
  });

  const createTask = async (title: string) => {
    try {
      await notion.pages.create(NewTask(title));
      console.log('task created');
    } catch (e) {
      console.log(`error when trying to create the task : ${e}`);
    }

    setTaskTitle('');
  };

  return (
    <Stack fill center spacing={2}>
      <Surface elevation={4} category="medium" style={styles.card}>
        <Text>Enter a task name: </Text>
        <View style={styles.taskInput}>
          <TextInput
            editable
            // multiline
            // numberOfLines={5}
            maxLength={300}
            onSubmitEditing={e => createTask(e.nativeEvent.text)}
            onChangeText={text => setTaskTitle(text)}
            value={taskTitle}
            style={{padding: 10}}
          />
        </View>
        <Button
          title="Add to notion"
          style={{alignSelf: 'center', marginTop: 40}}
          onPress={() => createTask(taskTitle)}
        />
      </Surface>
    </Stack>
    // <SafeAreaView style={backgroundStyle}>
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <View style={[styles.card, styles.shadowProp]}>

    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  taskInput: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  card: {width: '95%', padding: 20},
});

export default App;
