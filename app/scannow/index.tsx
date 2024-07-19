import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraView, CameraCapturedPicture, CameraPictureOptions, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { detectLabels } from './../api/rekognitionSetup';

export default function ScanNowScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [labels, setLabels] = useState<any>([]);
  const navigation = useNavigation();
  const cameraRef = useRef<any>(null);
  const [isCameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    if (!permission || !permission.granted) {
      console.log('Requesting camera permission');
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    let interval: any;
    if (isCameraReady) {
      console.log("ref", cameraRef.current)
      interval = setInterval(async () => {
        if (cameraRef.current) {
          try {
            console.log('Taking picture');
            const options: CameraPictureOptions = { base64: true };
            const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync(options);
            console.log('Picture taken, processing image');
            processImage(photo.base64!);
          } catch (error) {
            console.error('Error taking picture:', error);
          }
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isCameraReady]);

  const processImage = async (base64: string) => {
    try {
      const detectedLabels: any = await detectLabels(base64);
      setLabels(detectedLabels);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onCameraReady={() => {
            console.log('Camera is ready');
            setCameraReady(true);
          }}
        >
          <View style={styles.topContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Image
                style={styles.backIcon}
                source={require('./../../assets/images/ic_up_button.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.recognizedEquipmentContainer}>
            {labels.length > 0 ? (
              labels.map((label: any, index: any) => (
                <Text key={index} style={styles.recognizedText}>
                  {label.Name}: {label.Confidence.toFixed(2)}%
                </Text>
              ))
            ) : (
              <Text style={styles.recognizedText}>Recognized Equipment will be listed here</Text>
            )}
          </View>
        </CameraView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 36,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  recognizedEquipmentContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  recognizedText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
