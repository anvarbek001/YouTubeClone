/** @format */

import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Channel, Home, Navbar, Search, VideoDetail } from "../index";

const App = () => {
  return (
    <Box>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/search/:id" element={<Search />} />
      </Routes>
    </Box>
  );
};

export default App;
