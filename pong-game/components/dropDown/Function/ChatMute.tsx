import { instance } from "@/util/axios";

export default function ChatMute() {

  const chatUserMuteHandler =async () => {
    await instance.patch(
      `/mute`,{
        userId: 1,
        channelId: 123,
      }
    ).then(function(res){
      console.log(res);
    
    });
  }
  
  return (<>
  <button>채팅금지</button>
  </>)
}