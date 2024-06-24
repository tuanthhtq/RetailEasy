import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateBillParams, CreateBillStackName } from "../../../constants/ParamList.ts";
import AddBillItem from "../../../screens/AddBillItem";
import CreateBill from "../../../screens/CreateBill";

const CreateBillStack = () => {
  const Stack = createNativeStackNavigator<CreateBillParams>()

  return (
    <Stack.Navigator
      initialRouteName={CreateBillStackName.CREATE_BILL_HOME}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={CreateBillStackName.CREATE_BILL_HOME} component={CreateBill}/>
      <Stack.Screen name={CreateBillStackName.ADD_BILL_ITEM} component={AddBillItem}/>

    </Stack.Navigator>
  )
}

export default CreateBillStack;
