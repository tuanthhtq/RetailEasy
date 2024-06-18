import {StyleSheet, View} from "react-native";
import ScreenHeader from "../../components/ScreenHeader";

const Landing = () => {

  return (
    <View style={styles.container}>
      <ScreenHeader backBtn={false} logo />
      <View style={styles.main}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  main: {

  }
})

export default Landing;
