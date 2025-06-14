import { View, Text } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-green-600">
          Cooking Assistant 🍳
        </Text>
      </View>

      <View className="flex-1 items-center justify-center bg-blue-100">
        <Text className="text-2xl font-bold text-red-500">NativeWind works!</Text>
      </View>
    </View>
  );
}
