import { ExternalLink } from 'lucide-react';
import { useSponsors } from '../context/SponsorContext';

const withUtm = (targetUrl, campaignId, placement) => {
  try {
    const url = new URL(targetUrl);
    url.searchParams.set('utm_source', 'noxvelia');
    url.searchParams.set('utm_medium', 'sponsor_banner');
    url.searchParams.set('utm_campaign', campaignId);
    url.searchParams.set('utm_content', placement);
    return url.href;
  } catch {
    return '#';
  }
};

export default function SponsorBanner({ placement, vertical = 'all', className = '', fallback = null }) {
  const { campaigns } = useSponsors();
  const campaign = campaigns.find((item) => (
    item.placements?.includes(placement)
    && (item.vertical === 'all' || item.vertical === vertical || vertical === 'all')
  ));

  if (!campaign) return fallback;

  return (
    <aside className={`mx-auto my-8 w-full max-w-7xl px-4 sm:px-6 ${className}`} aria-label="Conteúdo patrocinado">
      <a
        href={withUtm(campaign.targetUrl, campaign.id, placement)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group grid min-h-[150px] overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-slate-600 md:grid-cols-[minmax(250px,38%)_1fr]"
      >
        <div className="relative min-h-[180px] overflow-hidden md:min-h-full">
          <img src={campaign.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-md border border-white/30 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
            {campaign.label}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-teal-600 dark:text-teal-300">Parceiro NOXVELIA</p>
          <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl">{campaign.title}</h2>
          {campaign.description && <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{campaign.description}</p>}
          <span className="mt-1 inline-flex items-center gap-2 text-sm font-extrabold text-slate-950 dark:text-white">
            {campaign.cta}<ExternalLink size={15} aria-hidden="true" />
          </span>
        </div>
      </a>
    </aside>
  );
}
