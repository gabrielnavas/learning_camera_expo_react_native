import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState<Camera>();
  const [imageUrl, setImageUrl] = useState<undefined | string>()

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera 
        ref={ref => {
          if(ref) setCamera(ref);
        }}
        style={styles.camera} 
        type={type}
        flashMode={Camera.Constants.FlashMode}
      >
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonInside}
            onPress={() => {
              // setType(
              //   type === Camera.Constants.Type.back
              //     ? Camera.Constants.Type.front
              //     : Camera.Constants.Type.back
              // );
              camera?.takePictureAsync({
                onPictureSaved: picture => {
                  console.log(picture)
                  setImageUrl(picture.uri)
                },

              })
            }}>
            <Text style={{color: 'red'}}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {
        imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
          />
        )
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'flex-end', 
  },
  button: {
    backgroundColor: 'red', 
    width: 50, 
    height: 50,
  },
  buttonInside: {
    backgroundColor: 'green',
    width: 50, 
    height: 50, 
  },
  image: {
    width: 50,
    height: 50,
  }
});
