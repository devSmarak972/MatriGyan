from channels.generic.websocket import AsyncWebsocketConsumer
import json
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name='Test-room'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    async def disconnect(self,msg):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
         )
        print("Disconnected!",msg)
        
    async def receive(self,text_data):
        receive_dict=json.loads(text_data)
        message=receive_dict["message"]
        action=receive_dict["action"]
        print(receive_dict,"received")
        if(action=="new-offer") or (action=="new-answer"):
            receiver_channel_name=receive_dict["message"]["receiver_channel_name"]
            print(action,receiver_channel_name,self.channel_name)
            receive_dict["message"]["receiver_channel_name"]=self.channel_name
            await self.channel_layer.send(
            receiver_channel_name,
            {
                "type":"send.sdp",
                "receive_dict":receive_dict
                
            }
        )
            return
        print(action,"sending to al",self.channel_name)

        receive_dict["message"]["receiver_channel_name"]=self.channel_name
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type":"send.sdp",
                "receive_dict":receive_dict
                
            }
        )
    async def send_message(self,event):
        message=event["message"]
        await self.send(text_data=json.dumps({
            "message":message
        })) 
        
    async def send_sdp(self,event):
        receive_dict=event["receive_dict"]
        await self.send(text_data=json.dumps(receive_dict)) 