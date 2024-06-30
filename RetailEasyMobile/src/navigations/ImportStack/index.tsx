import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateImportParams, CreateImportStackName } from "../../constants/ParamList.ts";
import CreateImport from "../../screens/CreateImport";
import AddImportItem from "../../screens/CreateImport/screen/AddImportItem";
import ConfirmImport from "../../screens/CreateImport/screen/ConfirmImport";


const ImportStack = () => {

  const Stack = createNativeStackNavigator<CreateImportParams >()


  return (
    <Stack.Navigator
      initialRouteName={CreateImportStackName.CREATE_IMPORT_HOME}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={CreateImportStackName.CREATE_IMPORT_HOME} component={CreateImport}/>
      <Stack.Screen name={CreateImportStackName.ADD_IMPORT_ITEM} component={AddImportItem}/>
      <Stack.Screen name={CreateImportStackName.CONFIRM_IMPORT} component={ConfirmImport}/>
    </Stack.Navigator>
  )
}

export default ImportStack
