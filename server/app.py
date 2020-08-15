import asyncio
import websockets
import json

selectedCards = {}

connections = []

async def echo(websocket, path):
    global connections
    connections.append(websocket)

    async for message in websocket:
        action = json.loads(message)
        print(action)

        print(f"Message received: {action['type']}")

        if action["type"] == "SELECT_CARD":
            print("selected card")
            username = action["payload"]["username"]
            card = action["payload"]["card"]

            if not username in selectedCards:
                print("exiting function")
                return

            selectedCards[username] = card

            await websocket.send(json.dumps({
                "type": "CARD_SELECTED",
                "payload": { "username": username, "card": card }
            }))

            for index, connection in enumerate(connections):
                try:
                    await connection.send(json.dumps({
                        "type": "USER_SELECTED_CARD",
                        "payload": { "username": username, "card": card }
                    }))
                except Exception as e:
                    print(e)
                    # del connections[index]
                    print("Removed connection")


        if action["type"] == "REGISTER_USER":
            username = action["payload"]["username"]
            selectedCards[username] = {"username": username}

            await websocket.send(json.dumps({
                "type": "REGISTERED_SUCCESS",
                "payload": { "username": username }
            }))

            for index, connection in enumerate(connections):
                print(index, username)
                try:
                    await connection.send(json.dumps({
                        "type": "USER_REGISTERED",
                        "payload": { "users": list(selectedCards.keys()), "user": username}
                    }))
                except Exception as e:
                    print(e)
                    # del connections[index]
                    print("Removed connection")

asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, 'localhost', 8765))
asyncio.get_event_loop().run_forever()