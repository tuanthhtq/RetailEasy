import { StyleSheet, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";


const UnAuthProfile = ({}) => {
  return (
    <View style={style.container}>
      <ScreenHeader label={"User"} isLogo={false} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default UnAuthProfile;
