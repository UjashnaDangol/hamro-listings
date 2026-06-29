import User from "../models/userModel.js";

export const updateAgentLevel = async (agent) => {
  const sales = agent.agentProfile.totalSalesCount;
  const rating = agent.agentProfile.rating || 0;

  let newLevel = "verified";

  if (sales >= 50 && rating >= 4.5) {
    newLevel = "top-agent";
  } else if (sales >= 20) {
    newLevel = "gold";
  } else if (sales >= 5) {
    newLevel = "silver";
  }

  // only update if changed (avoids unnecessary writes)
  if (agent.agentProfile.agentLevel !== newLevel) {
    agent.agentProfile.agentLevel = newLevel;
  }

  return agent;
};

export const updateAgentStats = async ({
  agentId,
  saleValue,
  commissionRate = 2,
}) => {
  const agent = await User.findById(agentId);

  if (!agent || agent.role !== "agent") return;

  const commission = (saleValue * commissionRate) / 100;

  agent.agentProfile.totalSalesCount += 1;
  agent.agentProfile.totalSalesValue += saleValue;
  agent.agentProfile.commission += commission;

  await updateAgentLevel(agent);

  await agent.save();
};