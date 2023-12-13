import Chat from "@/components/Chat";
import Role from "@/enums/Role";
import LayoutAuth from "@/layouts/LayoutAuth";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { request, useModel, useParams } from "@umijs/max";
import { Avatar, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default () => {
  const { initialState } = useModel("@@initialState");
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState({});
  const [isVideoPlaying, setVideoPlay] = useState(false);
  const [connection, setConnection] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

 const handleProgress = (progress : any) => {
  setCurrentTime(progress.playedSeconds);
};

  const getCurrentSeccions = () => {
    setLoading(true);
    request(`/api/session/GetSessionById/${id}`)
      .then((result: any) => {
        setSession(result);
        console.log(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => getCurrentSeccions(), []);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5019/chat")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        connection.on("VideoStatus", function (isVideoPlaying, currentTime) {
          setVideoPlay(isVideoPlaying);
          setCurrentTime(currentTime);
          console.log(currentTime)
        });
      })
      .catch((err) => console.error(err));

    setConnection(connection);

    return () => {
      connection.stop();
    };
  }, []);

  const changeVideoStatus = (isVideoPlaying: boolean) => {
    connection.invoke("StartVideo", isVideoPlaying, currentTime).catch(function (err: any) {
      console.log(err);
    });
  };

  return (
    <>
      <LayoutAuth>
        <Row style={{ height: "90vh" }}>
          <Col span={18} className="player-wrapper">
            <ReactPlayer
              playing={isVideoPlaying}
              onPlay={initialState?.role === Role.admin ? () => changeVideoStatus(true) : () => {}}
              onPause={initialState?.role === Role.admin ? () => changeVideoStatus(false): () => {}}
              onProgress={handleProgress}
              className="react-player"
              url={session.video ? session.video.url : ""}
              width="100%"
              height="570px"
              controls={initialState?.role === Role.admin ? true : false}
            />
            <Row justify="space-between" style={{ padding: 10 }}>
              <Col>
                <h1>{session.video ? session.video.title : ""}</h1>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <h3 style={{ paddingTop: 5, paddingRight: 5 }}>
                      Автор трансляции:{" "}
                    </h3>
                  </Col>
                  <Col>
                    <Avatar
                      src={
                        session.video ? session.video.user.avatarImageUrl : ""
                      }
                    />
                  </Col>
                  <Col>
                    <h3 style={{ paddingTop: 5 }}>
                      {session.video ? session.video.user.nickName : ""}
                    </h3>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Chat sessionId={id ? id : ""} />
          </Col>
        </Row>
      </LayoutAuth>
    </>
  );
};
