/* CORE EV — Root application */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "affiliationShow": true,
  "affiliationText": "CORE EV is a core facility within",
  "affiliationTone": "parchment",
  "affiliationShowCrest": true,
  "affiliationShowLogo": false
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [page, setPage] = React.useState(() => {
    if (window.location.hash.indexOf('invite=') !== -1 || window.location.hash.indexOf('reset=') !== -1) return 'portal';
    return localStorage.getItem('core_ev_page') || 'home';
  });

  function navigate(p) {
    setPage(p);
    localStorage.setItem('core_ev_page', p);
    window.scrollTo(0, 0);
  }

  const affiliation = {
    show: t.affiliationShow,
    text: t.affiliationText,
    tone: t.affiliationTone,
    showCrest: t.affiliationShowCrest,
    showLogo: t.affiliationShowLogo
  };

  const pageMap = {
    home: <HomePage onNav={navigate} affiliation={affiliation} />,
    about: <AboutPage onNav={navigate} />,
    services: <ServicesPage onNav={navigate} />,
    equipment: <EquipmentPage onNav={navigate} />,
    team: <TeamPage onNav={navigate} />,
    publications: <PublicationsPage />,
    contact: <ContactPage />,
    portal: <PortalPage onNav={navigate} />
  };

  const showFooter = page !== 'portal';

  return (
    <div>
      <GlobalNav currentPage={page} onNav={navigate} data-comment-anchor="d52ef699b5-button-114-11" />
      {pageMap[page] || pageMap.home}
      {showFooter && <Footer onNav={navigate} />}

      <TweaksPanel>
        <TweakSection label="UGent affiliation band" />
        <TweakToggle label="Show band" value={t.affiliationShow} onChange={(v) => setTweak('affiliationShow', v)} />
        <TweakText label="Caption" value={t.affiliationText} onChange={(v) => setTweak('affiliationText', v)} />
        <TweakRadio label="Tone" value={t.affiliationTone} options={['parchment', 'white', 'dark']} onChange={(v) => setTweak('affiliationTone', v)} />
      </TweaksPanel>
    </div>);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);