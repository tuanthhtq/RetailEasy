import React, { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { ImportItemDto } from "../../../../apis/dto/import.item.dto.ts";


interface IAddGoodsModal{
  visible?: boolean,
  type: "import" | "return",
  onClose: ()=>void
}

const AddGoodsModal:React.FC<IAddGoodsModal> =({visible= false, type, onClose= () => {} }) => {

  const [item, setItem] = useState<ImportItemDto[]>([]);

  return (
    <Modal
      transparent
      visible={visible}
    >

    </Modal>
  )
}


const style = StyleSheet.create({

})

export default AddGoodsModal
