import React, { useState, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Dashboard() {
  const [isInCall, setIsInCall] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const [showJoinForm, setShowJoinForm] = useState(false);

  // Check URL for roomID parameter on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomIDFromURL = urlParams.get("roomID");

    if (roomIDFromURL) {
      joinRoom(roomIDFromURL);
    }
  }, []);

  // Generate a unique room ID
  const roomID = "asl-video-room-" + Date.now().toString();

  // Random user ID
  const userID = Math.floor(Math.random() * 10000).toString();
  const userName = "User_" + userID;

  const startVideoCall = async () => {
    joinRoom(roomID);
  };

  const joinRoom = async (roomToJoin) => {
    setIsInCall(true);

    const callContainer = document.getElementById("zego-container");

    const appID = parseInt(import.meta.env.VITE_APP_ID);
    const serverSecret = import.meta.env.VITE_SERVER_SECRET;

    console.log("AppID:", appID);
    console.log("Server Secret exists:", !!serverSecret);

    if (!appID || !serverSecret) {
      console.error(
        "ZegoCloud credentials missing. Please check your .env file"
      );
      alert(
        "Video call configuration error. Please check console for details."
      );
      setIsInCall(false);
      return;
    }

    try {
      // Create token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomToJoin,
        userID,
        userName
      );

      // Create instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Join room
      zp.joinRoom({
        container: callContainer,
        sharedLinks: [
          {
            name: "Copy Link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomToJoin,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
          config: {
            role: "Host",
            maxUsers: 12,
          },
        },
        showScreenSharingButton: true,
        showTextChat: true,
        onLeaveRoom: () => {
          setIsInCall(false);
          // Clear the URL parameter when leaving the room
          window.history.pushState(
            {},
            document.title,
            window.location.pathname
          );
        },
      });
    } catch (error) {
      console.error("Error joining room:", error);
      alert("Failed to join video call: " + error.message);
      setIsInCall(false);
    }
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (joinRoomId.trim()) {
      joinRoom(joinRoomId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isInCall ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                ASL Connect Dashboard
              </h1>

              {showJoinForm ? (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">
                    Join Existing Room
                  </h2>
                  <form
                    onSubmit={handleJoinRoom}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <input
                      type="text"
                      value={joinRoomId}
                      onChange={(e) => setJoinRoomId(e.target.value)}
                      placeholder="Enter Room ID"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Join Room
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowJoinForm(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="mb-8 flex justify-between items-center">
                  <h2 className="text-xl font-medium text-gray-900">
                    Video Conferencing
                  </h2>
                  <button
                    onClick={() => setShowJoinForm(true)}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Join Existing Room
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Video Call Card */}
                <div className="bg-indigo-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Video Call
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Start a real-time video call with ASL interpretation
                    </p>
                    <button
                      onClick={startVideoCall}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Start New Call
                    </button>
                  </div>
                </div>

                {/* Learn ASL Card */}
                <div className="bg-green-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Learn ASL
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Access tutorials and resources to learn American Sign
                      Language
                    </p>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Learn Now
                    </button>
                  </div>
                </div>

                {/* Practice ASL Card */}
                <div className="bg-yellow-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Practice ASL
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Practice your ASL skills with interactive exercises
                    </p>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                      Start Practice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="zego-container" className="w-full h-screen"></div>
      )}
    </div>
  );
}

export default Dashboard;
