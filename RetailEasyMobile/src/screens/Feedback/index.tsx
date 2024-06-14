import { StyleSheet, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";

const Feedback = () => {
  return (
    <View style={style.container}>
      <ScreenHeader label={"Phản hồi"}/>
      <View style={style.main}>

      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  main: {
    width: horizontalPixel(320),
    height: verticalPixel(624),
    marginTop: verticalPixel(15),
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
})

export default Feedback
