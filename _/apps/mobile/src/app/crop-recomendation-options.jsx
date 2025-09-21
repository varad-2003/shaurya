import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cpu, MapPin, MessageCircle, User, Bell } from 'lucide-react-native';

export default function HomeScreen() {
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
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#2E7D32',
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
        }}
      >
        {/* Quick Access Chatbot */}
        <TouchableOpacity
          onPress={() => router.push('/chatbot')}
          style={{
            backgroundColor: '#2E7D32',
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
            width: '100%',
          }}
        >
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            padding: 12,
            marginRight: 16,
          }}>
            <MessageCircle size={28} color="white" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 4,
            }}>
              Ask KisanMitra Assistant
            </Text>
            <Text style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
            }}>
              Get instant answers to your farming questions
            </Text>
          </View>
        </TouchableOpacity>

        {/* Two Cards */}
        <TouchableOpacity
          onPress={() => router.push('/crop-recommendation')}
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 32,
            marginBottom: 24,
            width: '100%',
            alignItems: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            flexDirection: 'row',
            gap: 16,
          }}
        >
          <Cpu size={32} color="#2E7D32" />
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2E7D32',
          }}>
            By IoT Sensor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/crop-recommendation-by-location')}
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 32,
            width: '100%',
            alignItems: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            flexDirection: 'row',
            gap: 16,
          }}
        >
          <MapPin size={32} color="#2E7D32" />
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2E7D32',
          }}>
            By Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}