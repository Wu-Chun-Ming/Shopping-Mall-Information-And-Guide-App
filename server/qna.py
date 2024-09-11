import asyncio
import websockets
import json

# Sample Q&A data
qna_data = [
    {"id": 1, "question": "What are the mall opening hours?", "answer": "The mall is open from 9 AM to 9 PM daily."},
    {"id": 2, "question": "Where can I find parking?", "answer": "Parking is available in the basement levels."},
    {"id": 3, "question": "Are pets allowed?", "answer": "Yes, pets are allowed in designated areas."}
]

# WebSocket server handler
async def qna_handler(websocket, path):
    while True:
        try:
            # Send the current Q&A data to the client
            await websocket.send(json.dumps(qna_data))
            await asyncio.sleep(5)  # Send updates every 5 seconds (or whenever changes occur)
        except websockets.ConnectionClosed:
            break

start_server = websockets.serve(qna_handler, "localhost", 8000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()