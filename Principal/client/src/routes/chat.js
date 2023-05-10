import axios from 'axios'
import { useEffect, useState } from 'react';
import { Picker } from 'emoji-mart';
import { useNavigate } from "react-router-dom";
import { CgSpinner } from 'react-icons/cg';
import io from 'socket.io-client';

var socket;

const Emoji = ({ symbol }) => (
    <span role="img" aria-label="emoji">
        {symbol}
    </span>
);

const emojiList = ["😊", "😂", "😍", "👍", "👎"];


export default function Chat() {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [content, setContent] = useState();
    const navigate = useNavigate();
    const [showEmojiList, setShowEmojiList] = useState(false);

    const scrollToChatBoxBottom = () => {
        let chatBox = document.getElementById('chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    const getMessages = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('/api/message');
            setMessages(data.messages);
            scrollToChatBoxBottom();
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    const createMessage = async (e) => {
        e.preventDefault();
        if (!content || !user || !user._id) return;
        if (isLoading) return;
        setIsLoading(true);
        try {
            let params = {
                header: {
                    "Content-type": "application/json"
                }
            }
            let userId = user._id;
            const { data } = await axios.post('/api/message', { content, user }, params);
            socket.emit('new message', data);
            // setMessages([...messages, data]);
            setContent('');
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    const addEmoji = (emoji) => {
        setContent((prevContent) => prevContent + emoji);
    };

    const handleEnterButton = (e) => {
        if (e.key === "Enter") {
            createMessage(e);
        }
    }

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) navigate('/signUp')
        else {
            setUser(currentUser);
            getMessages();
        }
    }, [navigate]);

    useEffect(() => {
        socket = io("http://localhost:5000");
        socket.emit("setup", user);
    }, [])

    useEffect(() => {
        scrollToChatBoxBottom();
    }, [messages])

    useEffect(() => {
        socket.on('message received', (message) => {
            setMessages([...messages, message]);
            scrollToChatBoxBottom();
        });
    });


    return (
        <div
            class="chat flex flex-col flex-grow"
            style={{
                width: '50vw',
                height: '80vh',
                position: 'relative',
                top: '10%',
                left: '20%',
                backgroundColor: 'rgb(255, 192, 203)',
                borderRadius: '10px',
                border: '1px solid black',
                padding: "10px",
            }}>
            <div id="chat-box" className="w-full flex-grow overflow-y-scroll">
                {messages?.map((message) => (
                    <div
                        key={message._id}
                        className={`flex flex-col ${message.user.username === user.username ? "items-end" : "items-start"
                            } gap-y-2 m-2`}
                    >
                        <p className="font-semibold flex items-center gap-x-2 flex-grow">
                            <img
                                src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${message.user.username}`}
                                alt=""
                                className="rounded-full"
                                width="32"
                            />
                            {message.user.username === user.username ? "Moi" : message.user.username} :
                        </p>
                        <div className="p-2 rounded-md shadow-md" style={{ backgroundColor: message.user.username === user.username ? "#00bfff" : "#d3d3d3" }}>
                            {message.content} {message.emoji && <Emoji symbol={message.emoji} />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex gap-x-2 items-end">
                <input
                    type="text"
                    placeholder="Message..."
                    className="p-2 border border-gray-300 rounded-md w-full"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    onKeyDown={handleEnterButton}
                />
                <button
                    className={`p-2 ${isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-400"
                        } rounded-md text-white shadow-sm flex items-center justify-center gap-x-2`}
                    onClick={createMessage}
                    disabled={isLoading ? "disabled" : ""}
                >
                    {isLoading && <CgSpinner className="animate-spin" />}
                    Envoyer
                </button>
                <button
                    class="p-2 bg-yellow-400 rounded-md text-white shadow-sm flex items-center justify-center gap-x-2"
                    onClick={() => setShowEmojiList((prev) => !prev)}
                >
                    😊
                </button>

                {showEmojiList && (
                    <div class="absolute bottom-14 right-2 z-10 bg-white p-2 rounded-md shadow-md flex flex-wrap gap-2">
                        {emojiList.map((emoji) => (
                            <button onClick={() => addEmoji(emoji)}>{emoji}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
