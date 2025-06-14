import { View, Text, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'

export default function RecipeScreen() {
  const [timeLeft, setTimeLeft] = useState(150) // 2:30 in seconds
  const [isRunning, setIsRunning] = useState(true)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    let interval = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => setIsRunning(!isRunning)
  const resetTimer = () => {
    setTimeLeft(150)
    setIsRunning(false)
  }

  const handleMicPress = () => {
    setIsListening(true)
    setTimeout(() => {
      setIsListening(false)
    }, 2000)
  }

  const speakStep = () => {
    const text =
      "Whisk the eggs vigorously in a bowl until the yolks and whites are completely combined. Add a pinch of salt and pepper to taste."
    Speech.speak(text)
  }

  return (
    <View className="flex-1 bg-yellow-50 px-4 py-6 justify-between">
      {/* Header */}
      <View className="items-center mt-6">
        <Text className="text-2xl font-bold text-gray-800">🍳 Scrambled Eggs</Text>
        <View className="w-16 h-1 bg-yellow-400 rounded-full mt-2" />
      </View>

      {/* Step Card */}
      <View className="bg-white/80 p-6 rounded-2xl shadow mt-6">
        <View className="items-center mb-4">
          <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
            <Text className="text-green-600 font-bold text-lg">2</Text>
          </View>
        </View>
        <Text className="text-xl font-bold text-gray-800 text-center mb-2">Step 2</Text>
        <Text className="text-gray-600 text-base text-center leading-relaxed">
          Whisk the eggs vigorously in a bowl until the yolks and whites are completely combined. Add a pinch of salt
          and pepper to taste.
        </Text>
      </View>

      {/* Timer */}
      <View className="bg-white/60 p-6 rounded-2xl shadow items-center mt-6">
        <View className="flex-row items-center mb-2">
          <Text className="text-2xl mr-2">⏱️</Text>
          <Text className="text-sm font-medium text-gray-600 uppercase">Timer</Text>
        </View>
        <Text className="text-4xl font-bold text-gray-800 font-mono mb-4">{formatTime(timeLeft)}</Text>

        <View className="flex-row gap-4">
          <Pressable
            onPress={toggleTimer}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            {isRunning ? (
              <Ionicons name="pause" size={20} color="#333" />
            ) : (
              <Ionicons name="play" size={20} color="#333" />
            )}
          </Pressable>

          <Pressable
            onPress={resetTimer}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <MaterialCommunityIcons name="restart" size={20} color="#333" />
          </Pressable>
        </View>
      </View>

      {/* Mic Button */}
      <View className="items-center mt-8 mb-2">
        <Pressable
          onPress={handleMicPress}
          className={`w-20 h-20 rounded-full items-center justify-center shadow-lg ${
            isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'
          }`}
        >
          <Ionicons name="mic" size={32} color="#fff" />
        </Pressable>
        <Text className="mt-2 text-sm text-gray-600 font-medium">
          {isListening ? '🎤 Listening...' : 'Tap to speak'}
        </Text>
      </View>

      {/* Read Step Button */}
      <View className="items-center mb-4">
        <Pressable onPress={speakStep} className="mt-2 bg-indigo-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-semibold">🔊 Read Step</Text>
        </Pressable>
      </View>

      {/* Progress Dots */}
      <View className="flex-row justify-center gap-2 mb-2">
        <View className="w-2 h-2 rounded-full bg-green-400" />
        <View className="w-2 h-2 rounded-full bg-green-400" />
        <View className="w-2 h-2 rounded-full bg-gray-300" />
        <View className="w-2 h-2 rounded-full bg-gray-300" />
        <View className="w-2 h-2 rounded-full bg-gray-300" />
      </View>
    </View>
  )
}
