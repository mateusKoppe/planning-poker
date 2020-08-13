import asyncio
import websockets
import json

selectedCards = {}

async def echo(websocket, path):
    async for message in websocket:
        action = json.loads(message)
        if action["type"] == "SELECT_CARD":
            username = action["payload"]["username"]
            card = action["payload"]["card"]

            if username is not selectedCards:
                return

            selectedCards[username] = card

            await websocket.send(json.dumps({
                "type": "CARD_SELECTED",
                "payload": { "username": username, "card": card }
            }))

        if action["type"] == "REGISTER_USER":
            username = action["payload"]["username"]
            selectedCards[username] = None
            print("REGISTER_USER")
            await websocket.send(json.dumps({
                "type": "USER_REGISTERED",
                "payload": { "username": username }
            }))
            print("message sent")


asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, 'localhost', 8765))
asyncio.get_event_loop().run_forever()