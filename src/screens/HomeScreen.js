import { View, Text, Pressable } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-green-600">Welcome to Cooking Assistant 🍽️</Text>
      <Pressable
        className="mt-6 px-4 py-2 bg-blue-500 rounded"
        onPress={() => navigation.navigate('Recipe')}
      >
        <Text className="text-white font-semibold">Start Cooking</Text>
      </Pressable>
    </View>
  );
}
