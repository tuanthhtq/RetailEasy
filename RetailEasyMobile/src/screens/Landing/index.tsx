import {StyleSheet, View} from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import Logo from "../../components/icons/Logo";

const Landing = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader backBtn={false} logo={<Logo/>} />
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
