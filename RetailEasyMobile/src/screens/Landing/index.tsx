import {StyleSheet, View} from "react-native";
import ScreenHeader from "../../components/ScreenHeader";

const Landing = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
})

export default Landing;
