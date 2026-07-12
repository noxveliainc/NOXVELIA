import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const SponsorContext = createContext({ campaigns: [] });

export function SponsorProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    let active = true;
    api.get('/sponsors')
      .then(({ data }) => {
        if (active) setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
      })
      .catch(() => {
        if (active) setCampaigns([]);
      });
    return () => { active = false; };
  }, []);

  const value = useMemo(() => ({ campaigns }), [campaigns]);
  return <SponsorContext.Provider value={value}>{children}</SponsorContext.Provider>;
}

export const useSponsors = () => useContext(SponsorContext);
