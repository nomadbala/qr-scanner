import {
  Button,
  StyleSheet,
  Text,
  View,
  Appearance,
  useColorScheme,
} from "react-native";
import { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogs } from "../LogContext";

const colorScheme = Appearance.getColorScheme();

export default function QrCodeScanner({ navigation }: any) {
  const [hasPermision, setHasPermision] = useState(false);

  const [scanned, setScanned] = useState(false);

  const [qrCode, setQrCode] = useState(null);

  const { logs, addLog } = useLogs();

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermision(status === "granted");
    };
    getPermission();
  }, []);

  const handleBarCode = ({ data }: any) => {
    setScanned(true);
    setQrCode(data);
    addLog(data);
  };

  if (hasPermision === false) {
    return <Text>Запрос разрешения на использование камеры</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCode}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <SafeAreaView style={styles.qrCodeContainer}>
          <Text style={styles.qrCodeText}>QR-Код: {qrCode}</Text>
          <Button
            title="Сканировать еще раз"
            onPress={() => {
              setScanned(false);
            }}
          />
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorScheme === "dark" ? "black" : "white",
  },
  qrCodeText: {
    fontSize: 16,
    color: colorScheme === "dark" ? "white" : "black",
  },
  qrCodeContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colorScheme === "dark" ? "black" : "white",
  },
});
