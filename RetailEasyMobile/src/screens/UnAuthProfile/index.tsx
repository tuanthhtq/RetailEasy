import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";
import { COLORS } from "../../constants/Colors.ts";
import Divider from "../../components/icons/Divider";
import ArchiveIcon from "../../components/icons/ArchiveIcon";
import ChatIcon from "../../components/icons/ChatIcon";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnauthorizedParams, UnAuthProfileParams } from "../../constants/ParamList.ts";
import { UnauthorizedStackName, UnAuthProfileStackName } from "../../constants/StackName.ts";
import { StackScreenProps } from "@react-navigation/stack";


type NavigationProp = StackScreenProps<UnauthorizedParams, UnauthorizedStackName.PROFILE>

const UnAuthProfile = ({navigation} : NavigationProp) => {

  const a = () => {
    navigation.navigate(UnauthorizedStackName.PROFILE, {screen: UnAuthProfileStackName.FEEDBACK});
    console.log(1);
  }
  return (
    <View style={style.container}>
      <ScreenHeader label={"Profile"} />
      <View style={style.main}>
        <View style={style.customer}>
          <View style={style.heading}>
            <Text style={style.headingText}>Customer</Text>
          </View>
          <View style={style.list}>
            <View style={style.listItem}>
              <View
                style={style.itemMain}
                onTouchStart={() => a()}
              >
                <ArchiveIcon/><Text style={style.text}>Order history</Text>
              </View>
              <Divider/>
            </View>
            <View style={style.listItem}>
              <View style={style.itemMain}>
                <ChatIcon/><Text style={style.text}>Feedback</Text>
              </View>
              <Divider/>
            </View>
          </View>
        </View>
        <View style={style.employee}>
          <View style={style.heading}>
            <Text style={style.headingText}>Employee</Text>
          </View>
          <View style={style.list}>
            <View style={style.listItem}>
              <View style={style.itemMain}>
                <ArchiveIcon/><Text style={style.text}>Login</Text>
              </View>
              <Divider/>
            </View>
          </View>

        </View>
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
  heading: {
  },
  headingText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(30)
  },
  customer: {
    width: horizontalPixel(315),
    height: verticalPixel(230),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  employee: {
    width: horizontalPixel(315),
    height: verticalPixel(150),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  list: {

  },
  listItem: {
    width: horizontalPixel(315),
    height: verticalPixel(79)
  },
  itemMain:{
    flexDirection: 'row',
    width: horizontalPixel(291),
    height: verticalPixel(48),
    justifyContent: 'flex-start',
    gap: horizontalPixel(10),
    paddingHorizontal: horizontalPixel(10)
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(16)
  }
})

export default UnAuthProfile;
