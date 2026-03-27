export interface VipTier {
  level: string;
  taskLimit: number;
  earningMultiplier: number;
}

export const VIP_TIERS: Record<string, VipTier> = {
  Junior: { level: "Junior", taskLimit: 40, earningMultiplier: 1.0 },
  Professional: { level: "Professional", taskLimit: 50, earningMultiplier: 1.5 },
  Expert: { level: "Expert", taskLimit: 60, earningMultiplier: 2.0 },
  Elite: { level: "Elite", taskLimit: 80, earningMultiplier: 3.0 },
};

export const getVipTier = (level: string): VipTier => {
  return VIP_TIERS[level] || VIP_TIERS.Junior;
};

export const VIP_LEVELS = Object.keys(VIP_TIERS);
