import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';

export default function CropRecommendationLocation() {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const router = useRouter();

  const handleGetRecommendation = async () => {
    if (!location.trim()) {
      Alert.alert('Please enter your location');
      return;
    }
    setLoading(true);
    setRecommendation(null);

    // Simulate API call
    setTimeout(() => {
      setRecommendation([
        'Wheat',
        'Rice',
        'Maize'
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        marginBottom: 24,
      }}>
        <MapPin size={36} color="#2E7D32" style={{ marginBottom: 12 }} />
        <Text style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#2E7D32',
          marginBottom: 8,
        }}>
          Crop Recommendation by Location
        </Text>
        <Text style={{
          fontSize: 15,
          color: '#666',
          marginBottom: 16,
          textAlign: 'center',
        }}>
          Enter your village, city, or district to get crop suggestions for your area.
        </Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Enter your location"
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 10,
            padding: 12,
            marginBottom: 16,
            fontSize: 16,
            backgroundColor: '#FAFAFA',
          }}
        />
        <TouchableOpacity
          onPress={handleGetRecommendation}
          style={{
            backgroundColor: '#2E7D32',
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 32,
            alignItems: 'center',
            marginBottom: 8,
            width: '100%',
          }}
          disabled={loading}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
            {loading ? 'Getting Recommendation...' : 'Get Recommendation'}
          </Text>
        </TouchableOpacity>
      </View>

      {recommendation && (
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          width: '100%',
          alignItems: 'center',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 8,
          }}>
            Recommended Crops
          </Text>
          {recommendation.map((crop, idx) => (
            <Text key={idx} style={{ fontSize: 16, color: '#444', marginBottom: 4 }}>
              {crop}
            </Text>
          ))}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}