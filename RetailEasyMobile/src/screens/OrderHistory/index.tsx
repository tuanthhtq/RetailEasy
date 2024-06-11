import { StyleSheet, View } from "react-native";
import { horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";
import ScreenHeader from "../../components/ScreenHeader";

const OrderHistory = () => {
  return (
    <View style={style.container}>
      <ScreenHeader label={"Order history"}/>
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

export default OrderHistory;
