import React,{useState} from 'react';
import {ChatState} from "../Context/ChatProvider"
import { Flex,Spacer} from "@chakra-ui/react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/dashboard/SideDrawer";

function Chat() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Flex justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        <Spacer/>
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        )}
      </Flex>
    </div>
  )
}

export default Chat;

