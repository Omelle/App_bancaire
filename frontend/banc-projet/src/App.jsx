import React, { useState, useEffect } from 'react';
import DashboardMobile from "./pages/DashboardMobile"
import { 
  CreditCard, 
  TrendingUp, 
  Send, 
  Plus, 
  Eye, 
  EyeOff, 
  Bell,
  Settings,
  User,
  Wallet,
  BarChart3,
  Menu,
  X,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Shield,
  Zap,
  Globe,
  PiggyBank,
  Target,
  MessageCircle,
  QrCode,
  Camera,
  ChevronRight,
  Home,
  History,
  MoreHorizontal
} from 'lucide-react';


// Hook pour gérer la responsivité
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet };
};

// Composant Header responsive
const Header = ({ user, totalBalance, showBalance, setShowBalance, onMenuToggle, showMenu }) => (
  <header className="sticky top-0 z-40 px-4 md:px-6 pt-8 md:pt-12 pb-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border-b border-white/10">
    <div className="flex items-center justify-between mb-4 md:mb-6">
      <div className="flex items-center space-x-3 md:space-x-4">
        <button 
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={onMenuToggle}
        >
          {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="hidden sm:block">
          <p className="text-gray-400 text-sm">Bonjour,</p>
          <p className="text-base md:text-lg font-semibold">{user.name}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
          <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
        </button>
        <button className="hidden md:block p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Settings className="w-6 h-6 text-gray-300" />
        </button>
      </div>
    </div>
    
    <div className="text-center">
      <p className="text-gray-400 text-sm mb-1">Solde total</p>
      <div className="flex items-center justify-center space-x-2">
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold">
          {showBalance ? `€${totalBalance.toLocaleString()}` : '€•••••••'}
        </p>
        <button 
          onClick={() => setShowBalance(!showBalance)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          {showBalance ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
        </button>
      </div>
      <p className="text-green-400 text-sm mt-1 flex items-center justify-center">
        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
        +2.4% ce mois
      </p>
    </div>
  </header>
);

// Composant Carousel de cartes responsive
const CardCarousel = ({ cards, selectedCard, setSelectedCard, isMobile }) => (
  <section className="px-4 md:px-6 mb-6">
    <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
      <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
      Mes Cartes
    </h2>
    
    <div className={`${isMobile ? 'overflow-x-auto' : 'relative'} pb-4`}>
      <div className={`${isMobile ? 'flex space-x-4 min-w-max' : 'relative'}`}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${isMobile ? 'flex-shrink-0 w-80' : 'relative'} p-4 md:p-6 rounded-2xl bg-gradient-to-br ${card.color} cursor-pointer transition-all duration-300 ${
              !isMobile && index !== selectedCard ? 'ml-4 mt-4 opacity-70 scale-95' : 'shadow-2xl shadow-purple-500/20'
            } ${isMobile ? 'hover:scale-105' : ''}`}
            onClick={() => setSelectedCard(index)}
            style={!isMobile ? { zIndex: cards.length - index } : {}}
          >
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div>
                <p className="text-white/80 text-sm">{card.type}</p>
                <p className="text-white text-base md:text-lg font-mono">{card.number}</p>
              </div>
              <div className="w-8 h-6 bg-white/20 rounded backdrop-blur-sm"></div>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/80 text-xs">SOLDE</p>
                <p className="text-white text-lg md:text-xl font-bold">€{card.balance.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-xs">EXP</p>
                <p className="text-white text-sm font-mono">12/27</p>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Composant Actions rapides
const QuickActions = ({ isMobile }) => {
  const actions = [
    { icon: Send, label: 'Virement', color: 'bg-blue-500' },
    { icon: Plus, label: 'Recharge', color: 'bg-green-500' },
    { icon: QrCode, label: 'QR Pay', color: 'bg-purple-500' },
    { icon: Camera, label: 'Scanner', color: 'bg-orange-500' },
    { icon: CreditCard, label: 'Factures', color: 'bg-red-500' },
    { icon: PiggyBank, label: 'Épargne', color: 'bg-emerald-500' }
  ];

  return (
    <section className="px-4 md:px-6 mb-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Actions Rapides</h2>
      <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-6 lg:grid-cols-6'} gap-3 md:gap-4`}>
        {actions.slice(0, isMobile ? 6 : 6).map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className={`${action.color} p-2 md:p-3 rounded-full mb-2`}>
              <action.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-xs text-gray-300">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

// Composant Services Premium
const PremiumServices = ({ isMobile }) => {
  const services = [
    { icon: Zap, title: 'Transferts Instantanés', desc: 'Envoi en temps réel', color: 'text-yellow-400' },
    { icon: Shield, title: 'Protection Fraude', desc: 'Sécurité renforcée par IA', color: 'text-green-400' },
    { icon: Smartphone, title: 'Mobile Banking', desc: 'Accès 24h/24', color: 'text-blue-400' },
    { icon: Globe, title: 'Accès Mondial', desc: 'Couverture internationale', color: 'text-purple-400' },
    { icon: MessageCircle, title: 'Support Live', desc: 'Chat en direct', color: 'text-pink-400' },
    { icon: BarChart3, title: 'Analytics Pro', desc: 'Insights avancés', color: 'text-cyan-400' }
  ];

  return (
    <section className="px-4 md:px-6 mb-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Services Premium</h2>
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3 lg:grid-cols-3'} gap-3 md:gap-4`}>
        {services.slice(0, isMobile ? 4 : 6).map((service, index) => (
          <div
            key={index}
            className="p-3 md:p-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <service.icon className={`w-6 h-6 md:w-8 md:h-8 ${service.color} mb-2`} />
            <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
            <p className="text-xs text-gray-400">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Composant Insights IA
const AIInsights = () => (
  <section className="px-4 md:px-6 mb-6">
    <h2 className="text-lg md:text-xl font-semibold mb-4">Insights IA</h2>
    <div className="space-y-3">
      <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl border border-emerald-500/20 hover:scale-[1.02] transition-transform cursor-pointer">
        <div className="flex items-center mb-2">
          <PiggyBank className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="text-sm font-semibold">Objectif d'épargne</span>
        </div>
        <p className="text-xs md:text-sm text-gray-300">Vous êtes sur la bonne voie pour atteindre vos €50,000 d'ici décembre ! 🎯</p>
      </div>
      
      <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/20 hover:scale-[1.02] transition-transform cursor-pointer">
        <div className="flex items-center mb-2">
          <Target className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-sm font-semibold">Optimisation découverte</span>
        </div>
        <p className="text-xs md:text-sm text-gray-300">Économisez €200/mois en optimisant vos abonnements récurrents. 💡</p>
      </div>
    </div>
  </section>
);

// Composant Liste de transactions avec filtres
const TransactionList = ({ transactions, isMobile }) => {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    return filter === 'all' || transaction.type === filter;
  });

  return (
    <section className="px-4 md:px-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Transactions</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filtres rapides */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {['all', 'income', 'expense'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
              filter === filterType 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {filterType === 'all' ? 'Toutes' : filterType === 'income' ? 'Entrées' : 'Sorties'}
          </button>
        ))}
      </div>
      
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {transaction.type === 'income' ? 
                  <ArrowDownLeft className="w-4 h-4" /> : 
                  <ArrowUpRight className="w-4 h-4" />
                }
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">{transaction.title}</p>
                <p className="text-xs text-gray-400">{transaction.time} • {transaction.category}</p>
              </div>
            </div>
            
            <div className="text-right flex items-center space-x-2">
              <div>
                <p className={`font-semibold text-sm md:text-base ${
                  transaction.type === 'income' ? 'text-green-400' : 'text-white'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}€{Math.abs(transaction.amount).toLocaleString()}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Composant Navigation responsive
const Navigation = ({ activeTab, setActiveTab, isMobile }) => {
  const navItems = [
    { icon: Home, label: 'Accueil', key: 'home' },
    { icon: CreditCard, label: 'Cartes', key: 'cards' },
    { icon: Send, label: 'Transfer', key: 'transfer' },
    { icon: History, label: 'Historique', key: 'history' },
    { icon: User, label: 'Profil', key: 'profile' }
  ];

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              activeTab === item.key 
                ? 'bg-purple-500/20 text-purple-400 scale-110' 
                : 'text-gray-400 hover:text-white hover:scale-105'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// Menu latéral pour mobile
const SideMenu = ({ showMenu, onClose }) => (
  <>
    {showMenu && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" 
        onClick={onClose}
      />
    )}
    <div className={`fixed top-0 left-0 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 z-50 md:hidden ${
      showMenu ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            BankFuture
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="space-y-4">
          {[
            { icon: Home, label: 'Tableau de bord' },
            { icon: CreditCard, label: 'Mes cartes' },
            { icon: Send, label: 'Virements' },
            { icon: History, label: 'Historique' },
            { icon: BarChart3, label: 'Analytics' },
            { icon: Settings, label: 'Paramètres' },
            { icon: MessageCircle, label: 'Support' }
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center space-x-3 w-full p-3 hover:bg-white/10 rounded-xl transition-colors text-left"
            >
              <item.icon className="w-5 h-5 text-gray-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  </>
);

// Sidebar Desktop
const DesktopSidebar = () => (
  <aside className="col-span-3 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6">
    <div className="mb-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        BankFuture
      </h1>
    </div>
    
    <nav className="space-y-2">
      {[
        { icon: Home, label: 'Dashboard', active: true },
        { icon: CreditCard, label: 'Mes Cartes', active: false },
        { icon: Send, label: 'Virements', active: false },
        { icon: History, label: 'Transactions', active: false },
        { icon: BarChart3, label: 'Analytics', active: false },
        { icon: Settings, label: 'Paramètres', active: false }
      ].map((item, index) => (
        <button
          key={index}
          className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all duration-300 ${
            item.active 
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
    
    <div className="mt-8 p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
      <h3 className="font-semibold mb-2">🚀 Upgrade Pro</h3>
      <p className="text-xs text-gray-400 mb-3">Débloquez des fonctionnalités premium</p>
      <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-sm font-medium hover:scale-105 transition-transform">
        Upgrader
      </button>
    </div>
  </aside>
);

// Composant principal
export default function ResponsiveBankingApp() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCard, setSelectedCard] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [showMenu, setShowMenu] = useState(false);

  const user = {
    name: 'Alexandre Dubois',
    email: 'alexandre.dubois@email.com'
  };

  const cards = [
    { type: 'Premium', number: '•••• 4521', balance: 15420.50, color: 'from-purple-600 via-blue-600 to-cyan-500' },
    { type: 'Business', number: '•••• 7834', balance: 8750.25, color: 'from-gray-800 via-gray-700 to-gray-900' },
    { type: 'Savings', number: '•••• 2198', balance: 32100.00, color: 'from-emerald-500 via-teal-500 to-cyan-600' }
  ];

  const transactions = [
    { id: 1, type: 'expense', title: 'Amazon Purchase', amount: -89.99, time: '14:32', category: 'Shopping' },
    { id: 2, type: 'income', title: 'Salary Deposit', amount: 3200.00, time: '09:15', category: 'Income' },
    { id: 3, type: 'expense', title: 'Netflix Subscription', amount: -15.99, time: 'Hier', category: 'Entertainment' },
    { id: 4, type: 'expense', title: 'Grocery Store', amount: -125.45, time: 'Hier', category: 'Food' },
    { id: 5, type: 'income', title: 'Freelance Payment', amount: 850.00, time: 'Il y a 2 jours', category: 'Income' },
    { id: 6, type: 'expense', title: 'Uber Ride', amount: -24.50, time: 'Il y a 2 jours', category: 'Transport' },
    { id: 7, type: 'expense', title: 'Coffee Shop', amount: -8.90, time: 'Il y a 3 jours', category: 'Food' }
  ];

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white overflow-hidden">
      {/* Éléments d'arrière-plan animés */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Menu latéral mobile */}
      <SideMenu showMenu={showMenu} onClose={() => setShowMenu(false)} />

      {/* Contenu principal */}
      <div className={`relative z-10 ${isDesktop ? 'max-w-7xl mx-auto grid grid-cols-12 gap-6' : 'max-w-md mx-auto'} ${isMobile ? 'pb-20' : ''} bg-black/20 backdrop-blur-xl ${isDesktop ? '' : 'border-x border-white/10'} min-h-screen`}>
        
        {/* Sidebar Desktop */}
        {isDesktop && <DesktopSidebar />}

        {/* Zone de contenu principal */}
        <main className={isDesktop ? 'col-span-9' : ''}>
          <Header 
            user={user}
            totalBalance={totalBalance}
            showBalance={showBalance}
            setShowBalance={setShowBalance}
            onMenuToggle={() => setShowMenu(!showMenu)}
            showMenu={showMenu}
          />

          <div className="space-y-6">
            <CardCarousel 
              cards={cards}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              isMobile={isMobile}
            />

            <QuickActions isMobile={isMobile} />

            <PremiumServices isMobile={isMobile} />

            <AIInsights />

            <TransactionList transactions={transactions} isMobile={isMobile} />
          </div>
        </main>
      </div>

      {/* Navigation mobile */}
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobile={isMobile}
      />
    </div>
  );
}