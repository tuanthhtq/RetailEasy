import { StyleSheet, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";


const Menu = () => {



  return (
    <View style={style.container}>
      <ScreenHeader label={"Menu"} backBtn={false}/>

    </View>
  )
}

const style = StyleSheet.create({
  container: {

  },

})

export default Menu
