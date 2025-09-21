import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cpu, MapPin, MessageCircle, User, Bell } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CropRecommendationOptions() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  });

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#F8F9FA',
      paddingTop: insets.top,
    }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View>
            <Text style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: '#2E7D32',
              letterSpacing: 0.5,
            }}>
              {greeting}, Farmer! 🌾
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#666',
              marginTop: 4,
            }}>
              How can we help you today?
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={() => Alert.alert('Notifications', 'No new notifications')}
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 12,
                padding: 12,
                marginRight: 4,
              }}
            >
              <Bell size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 12,
                padding: 12,
              }}
            >
              <User size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          width: '100%',
        }}
      >
        {/* Quick Access Chatbot */}
        <TouchableOpacity
          onPress={() => router.push('/chatbot')}
          style={{
            backgroundColor: '#2E7D32',
            borderRadius: 18,
            padding: 22,
            marginBottom: 36,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 10,
            elevation: 8,
            width: width - 40,
          }}
          activeOpacity={0.85}
        >
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.18)',
            borderRadius: 14,
            padding: 14,
            marginRight: 18,
          }}>
            <MessageCircle size={30} color="white" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 21,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 4,
              letterSpacing: 0.2,
            }}>
              Ask KisanMitra Assistant
            </Text>
            <Text style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.85)',
            }}>
              Get instant answers to your farming questions
            </Text>
          </View>
        </TouchableOpacity>

        {/* Two Cards */}
        <View style={{
          flexDirection: width > 500 ? 'row' : 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}>
          <TouchableOpacity
            onPress={() => router.push('/crop-recommendation')}
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              padding: 32,
              marginBottom: width > 500 ? 0 : 20,
              width: width > 500 ? (width - 60) / 2 : '100%',
              alignItems: 'center',
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.10,
              shadowRadius: 10,
              flexDirection: 'row',
              gap: 18,
              borderLeftWidth: 5,
              borderLeftColor: '#607D8B',
            }}
            activeOpacity={0.85}
          >
            <Cpu size={36} color="#607D8B" />
            <View>
              <Text style={{
                fontSize: 21,
                fontWeight: 'bold',
                color: '#2E7D32',
                marginBottom: 2,
              }}>
                By IoT Sensor
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                marginTop: 2,
              }}>
                Use real-time sensor data
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/crop-recommendation-by-location')}
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              padding: 32,
              width: width > 500 ? (width - 60) / 2 : '100%',
              alignItems: 'center',
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.10,
              shadowRadius: 10,
              flexDirection: 'row',
              gap: 18,
              borderLeftWidth: 5,
              borderLeftColor: '#2196F3',
            }}
            activeOpacity={0.85}
          >
            <MapPin size={36} color="#2196F3" />
            <View>
              <Text style={{
                fontSize: 21,
                fontWeight: 'bold',
                color: '#2E7D32',
                marginBottom: 2,
              }}>
                By Location
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                marginTop: 2,
              }}>
                Get recommendations using your area
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}