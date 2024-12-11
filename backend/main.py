
import uvicorn
from pathlib import Path
from fastapi import FastAPI, Depends,WebSocket,WebSocketDisconnect,APIRouter

from fastapi.staticfiles import StaticFiles

from fastapi_users import FastAPIUsers
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, select

from auth.auth import auth_backend
from auth.database import User
from auth.manager import get_user_manager
from auth.schemas import UserRead, UserCreate,UserUpdate

from models.models import Conversation, Message

from routers.router import router
from routers.review_router import  router as review_router

from fastapi.middleware.cors import CORSMiddleware

from auth.database import get_db
from fastapi.responses import HTMLResponse


app = FastAPI(
    title='MORENTO',
    docs_url='',
    redoc_url='',
    openapi_url='',
)


app.include_router(router,
                   tags=["vehicles"])
app.include_router(review_router,
                   tags=["reviews"])


origins = [
    'http://127.0.0.1:3000',
    "http://localhost:3000",
    'http://127.0.0.1:8000',
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)


fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)


current_user = fastapi_users.current_user()



connections = []

roles = {1:'user', 2:'tech support'}


FRONTEND_DIST = Path('../car_rent_react/build')


app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="static")



@app.get("/")
async def root():
    if not (FRONTEND_DIST / "index.html").is_file():
        raise RuntimeError("Frontend not built. Please run `npm run build` in the frontend directory.")
    return {"message": "Hello, World"}

'''here must be (/{path:path}) endpoint for handle react router dom path while
but here its not working idk why so i transfer it to review_router.py in routers folder'''



'''this is the websocket endpoint, it and the endpoints below were intended 
to implementa technical support window. but i just dropped the matter'''
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket,username: str, user_id: int, role_id: int, db: Session = Depends(get_db)):
    await websocket.accept()

    connections.append(websocket)  # Add the connection to the list

    # Get the user's active conversation
    conversation = db.execute(
        select(Conversation).filter(
            Conversation.user_id == user_id,
            Conversation.operator_id == 7,
            Conversation.status == "active"
        ).limit(1)
    ).scalar()

    if conversation is None:
        operator_id = 7
        conversation = Conversation(user_id=user_id, operator_id= operator_id, status= "active")
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    try:
        while True:
            data = await websocket.receive_text()

            message = Message(
                conversation_id= conversation.id,
                user_id= user_id,
                username= username,
                role= roles[role_id],
                text_message= data
            )

            db.add(message)
            db.commit()

            # Broadcast the message to all connected clients
            for connection in connections:
                await connection.send_text(data)

    except WebSocketDisconnect:
        connections.remove(websocket)  # Remove the connection from the list
        
@app.websocket("/ws/conversation/{conversation_id}")
async def websocket_conversation_endpoint(websocket: WebSocket, conversation_id: int, role_id: int = 2, db: Session = Depends(get_db)):
    await websocket.accept()

    connections.append(websocket)  # Add the connection to the list

    # Get the conversation by id
    conversation = db.execute(
        select(Conversation).filter(
            Conversation.id == conversation_id
        ).limit(1)
    ).scalar()

    if conversation is None:
        return {"error": "Conversation not found"}

    # Check if the user has permission to join the conversation
    if role_id == 2 or role_id == 1:  # tech support
        pass
    else:
        # Check if the user is the owner of the conversation
        if conversation.user_id != 7:
            return {"error": "You don't have permission to join this conversation"}

    try:
        while True:
            data = await websocket.receive_text()

            # Save the message
            message = Message(
                conversation_id=conversation.id,
                user_id= 7,
                username= "tech support",
                role=roles[role_id],
                text_message=data
            )

            db.add(message)
            db.commit()
            db.close()

            # Broadcast the message to all connected clients
            for connection in connections:
                await connection.send_text(data)

    except WebSocketDisconnect:
        connections.remove(websocket)
@router.get('/support/conversations')
def get_conversations(user = current_user,db: Session = Depends(get_db)):
        messages = db.query(Message).all()
        return f'messages: {messages}'
# run the app
if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000)