import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { CameraView, CameraCapturedPicture, CameraPictureOptions, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';
import { detectCustomLabels } from '@/app/utils/api/detectCustomLabels';

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
      interval = setInterval(async () => {
        if (cameraRef.current) {
          try {
            console.log('Taking picture');
            const options: CameraPictureOptions = { base64: true };
            const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync(options);
            console.log('Picture taken, processing image');
            await processImage(photo.base64!);
          } catch (error) {
            console.error('Error taking picture:', error);
          }
        }
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isCameraReady]);

  const processImage = async (base64: string) => {
    try {
      const resizedImage: any = await resizeImage(base64);
      const detectedLabels: any = await detectCustomLabels(resizedImage.base64);
      const croppedImages = await cropDetectedObjects(resizedImage.base64, detectedLabels);
      updateLabels(croppedImages);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const resizeImage = async (base64: string) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      `data:image/jpeg;base64,${base64}`,
      [{ resize: { width: 640 } }],
      { format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    return resizedImage;
  };

  const cropDetectedObjects = async (base64: string, customLabels: any) => {
    const croppedImages = [];
    for (let label of customLabels) {
      if (label.Geometry && label.Geometry.BoundingBox) {
        const { BoundingBox } = label.Geometry;
        const croppedImage = await cropImage(base64, BoundingBox);
        croppedImages.push({
          uri: croppedImage.uri,
          name: label.Name,
          confidence: label.Confidence,
        });
      }
    }
    return croppedImages;
  };

  const cropImage = async (base64: string, boundingBox: any) => {
    const { width, height } = Image.resolveAssetSource({ uri: `data:image/jpeg;base64,${base64}` });
    const cropArea = {
      originX: boundingBox.Left * width,
      originY: boundingBox.Top * height,
      width: boundingBox.Width * width,
      height: boundingBox.Height * height,
    };
    return await ImageManipulator.manipulateAsync(
      `data:image/jpeg;base64,${base64}`,
      [{ crop: cropArea }],
      { format: ImageManipulator.SaveFormat.JPEG }
    );
  };

  const updateLabels = (newLabels: any) => {
    let combinedLabels = [...labels, ...newLabels];
    combinedLabels = combinedLabels.sort((a, b) => b.confidence - a.confidence);
    if (combinedLabels.length > 3) {
      combinedLabels = combinedLabels.slice(0, 3);
    }
    setLabels(combinedLabels);
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
          <View style={styles.recognizedEquipmentContainerWrapper}>
            <ScrollView horizontal contentContainerStyle={styles.recognizedEquipmentContainer}>
              {labels.length > 0 ? (
                labels.map((label: any, index: any) => (
                  <View key={index} style={styles.detectedItem}>
                    <Image source={{ uri: label.uri }} style={styles.detectedImage} />
                    <Text style={styles.detectedText}>
                      {label.name}: {label.confidence.toFixed(2)}%
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.recognizedText}>Recognized Equipment will be listed here</Text>
              )}
            </ScrollView>
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
  recognizedEquipmentContainerWrapper: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recognizedEquipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recognizedText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  detectedItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  detectedImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  detectedText: {
    color: 'white',
    fontSize: 14,
  },
});
