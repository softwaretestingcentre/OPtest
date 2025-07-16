import React from "react";
import KPIList from "./components/KPIList";
import SitePerformance from "./components/SitePerformance"
import SiteProjections from "./components/SiteProjections";
import SystemConfig from "./components/SystemConfig";
import CoolingAI from "./components/CoolingAI";
import CoolingApproval from "./components/CoolingApproval";
import CoolingSLAs from "./components/CoolingSLAs";

const SiteManager: React.FC = () => (
  <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
    <h1>Manage Site</h1>
    <KPIList />
    <SitePerformance />
    <SiteProjections />
    <SystemConfig />
    <CoolingAI />
    <CoolingApproval />
    <CoolingSLAs />
  </div>
);

export default SiteManager;