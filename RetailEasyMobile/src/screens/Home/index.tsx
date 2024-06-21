import { StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import { COLORS } from "../../constants/Colors.ts";
import ScreenHeader from "../../components/ScreenHeader";
import { IRootState, useAppDispatch } from "../../store/store.ts";
import { useSelector } from "react-redux";
import HTMLList from "../../components/HTMLList";


const Home = () => {
  const {fullName, roles} = useSelector((state: IRootState) => {
    return state.auth
  })


  const appDispatch = useAppDispatch();

  //rename role
  const renamedRole = () => {
    return roles.map(item => {
      if(item === "ROLE_ADMIN"){
        return "Quản trị viên"
      }else if (item === "ROLE_CASHIER"){
        return "Thu ngân"
      }else {
        return "Nhân viên nhập liệu"
      }
    })
  }


  return (
    <View style={style.container}>
      <ScreenHeader logo backBtn={false}/>

      <View style={style.main}>
        <View style={style.content}>
          <View style={style.heading}>
            <Text style={style.headingText}>Chào mừng trở lại</Text>
            <Text style={style.headingText}>{fullName}</Text>
          </View>
          <HTMLList heading={`Đăng nhập với tư cách`} listContent={renamedRole()}/>

        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  main: {
    width: horizontalPixel(320)
  },
  content: {
    gap: 10
  },
  heading: {

  },
  headingText: {
    fontSize: 28,
    color: COLORS.BLACK
  }

})

export default Home
