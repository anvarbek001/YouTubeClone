/** @format */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { ApiService } from "../../service/api.service";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import {
  CheckCircle,
  FavoriteOutlined,
  MarkChatRead,
  Tag,
  Visibility,
} from "@mui/icons-material";
import Loader from "../Loader/Loader";
import { Videos } from "../index";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideo, setRelatedVido] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiService.fetching(
          `videos?part=snippet,statistics&id=${id}`
        );
        console.log(data);
        setVideoDetail(data.items[0]);
        const relatedData = await ApiService.fetching(
          `search?part=snippet&videoId=${id}&type=video`
        );
        console.log(relatedData);
        setRelatedVido(relatedData.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  console.log(relatedVideo);

  if (!videoDetail) return <Loader />;

  return (
    <Box minHeight={"90vh"} mb={10}>
      <Box
        display={"flex"}
        p={2}
        sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }} height={"100vh"}>
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            playing
            controls
          />
          {videoDetail?.snippet?.tags?.map((item, idx) => (
            <Chip
              label={item}
              key={idx}
              sx={{ marginTop: "10px", cursor: "pointer", ml: "10px" }}
              deleteIcon={<Tag />}
              onDelete={() => {}}
              variant="outline"
            />
          ))}

          <Typography variant="h5" fontWeight={"bold"} p={2}>
            {videoDetail?.snippet?.title}
          </Typography>
          <Typography variant="subtitle2" p={2} sx={{ opacity: ".7" }}>
            {videoDetail?.snippet?.description}
          </Typography>
          <Stack
            direction={"row"}
            gap={"20px"}
            alignItems={"center"}
            py={1}
            px={2}>
            <Stack
              sx={{ opacity: ".7" }}
              direction={"row"}
              alignItems={"center"}
              gap={"3px"}>
              <Visibility />
              {parseInt(
                videoDetail?.statistics?.viewCount
              ).toLocaleString()}{" "}
              views
            </Stack>
            <Stack
              sx={{ opacity: ".7" }}
              direction={"row"}
              alignItems={"center"}
              gap={"3px"}>
              <FavoriteOutlined />
              {parseInt(
                videoDetail?.statistics?.likeCount
              ).toLocaleString()}{" "}
              likes
            </Stack>
            <Stack
              sx={{ opacity: ".7" }}
              direction={"row"}
              alignItems={"center"}
              gap={"3px"}>
              <MarkChatRead />
              {parseInt(
                videoDetail?.statistics?.commentCount
              ).toLocaleString()}{" "}
              comments
            </Stack>
          </Stack>
          <Stack direction={"row"} py={1} px={2}>
            <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={"5px"}
                marginTop={"5px"}>
                <Avatar
                  src={videoDetail?.snippet?.thumbnails?.default?.url}
                  alt={videoDetail?.snippet?.channelTitle}
                />
                <Typography>
                  {videoDetail?.snippet?.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Box>
        <Box
          width={{ xs: "100%", md: "25%" }}
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"scroll"}
          maxHeight={"130vh"}>
          <Videos videos={relatedVideo} />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
