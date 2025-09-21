
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Camera, X } from "lucide-react-native";

export default function DiseaseDetectionScreen() {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef();
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const takePicture = async () => {
    try {
      // First close camera modal
      setShowCamera(false);
      setShowResult(true);

      // Show result modal immediately
      console.log("Showing result modal immediately");
    } catch (error) {
      Alert.alert("Error", "Failed to take picture. Please try again.");
    }
  };

  const showDummyData = () => {};

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 20, textAlign: "center" }}>
          Camera Permission Required
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#2E7D32",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#F8F9FA", paddingTop: insets.top }}
    >
      <StatusBar style="dark" />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#2E7D32",
            marginBottom: 20,
          }}
        >
          Plant Disease Detection
        </Text>

        {capturedImage ? (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={showDummyData}>
              <Image
                source={{ uri: capturedImage }}
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: 12,
                  marginBottom: 20,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: "#666",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Tap the image to see analysis results again
            </Text>
            <TouchableOpacity
              onPress={() => {
                setCapturedImage(null);
                setShowResult(false);
              }}
              style={{
                backgroundColor: "#2E7D32",
                padding: 16,
                borderRadius: 12,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Take Another Photo
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setShowCamera(true)}
            style={{
              backgroundColor: "#2E7D32",
              padding: 20,
              borderRadius: 16,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Camera size={24} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 12,
              }}
            >
              Open Camera
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Camera Modal */}
      <Modal
        visible={showCamera}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={{ flex: 1 }}>
          <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

          {/* Camera Controls */}
          <View
            style={{
              position: "absolute",
              bottom: insets.bottom + 40,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={takePicture}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 4,
                borderColor: "#2E7D32",
              }}
            >
              <Camera size={32} color="#2E7D32" />
            </TouchableOpacity>
          </View>

          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setShowCamera(false)}
            style={{
              position: "absolute",
              top: insets.top + 20,
              left: 20,
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 8,
              borderRadius: 20,
            }}
          >
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Disease Detection Result Modal */}
      <Modal
        visible={showResult}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowResult(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 30,
              width: "90%",
              maxWidth: 400,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#2E7D32",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              🌿 Disease Detection Result
            </Text>

            <View style={{ alignItems: "flex-start", width: "100%" }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: "#333" }}>
                🦠 <Text style={{ fontWeight: "bold" }}>Disease:</Text> Leaf
                Blight
              </Text>
              <Text style={{ fontSize: 18, marginBottom: 10, color: "#333" }}>
                ⚠ <Text style={{ fontWeight: "bold" }}>Severity:</Text> Medium
              </Text>
              <Text style={{ fontSize: 18, marginBottom: 10, color: "#333" }}>
                📊 <Text style={{ fontWeight: "bold" }}>Confidence:</Text> 87%
              </Text>
              <Text style={{ fontSize: 18, marginBottom: 10, color: "#333" }}>
                💊 <Text style={{ fontWeight: "bold" }}>Treatment:</Text> Apply
                fungicide and remove affected leaves
              </Text>
              <Text style={{ fontSize: 18, marginBottom: 20, color: "#333" }}>
                🕒 <Text style={{ fontWeight: "bold" }}>Action:</Text> Treat
                within 3-5 days
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setShowResult(false)}
              style={{
                backgroundColor: "#2E7D32",
                padding: 16,
                borderRadius: 12,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}