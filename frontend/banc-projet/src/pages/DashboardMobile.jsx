import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Home, CreditCard, BarChart3, User } from "lucide-react"

const data = [
  { name: "Shopping", value: 400 },
  { name: "Food", value: 300 },
  { name: "Transport", value: 200 },
  { name: "Other", value: 100 },
]

const COLORS = ["#00ff9d", "#00d4ff", "#ffe600", "#ff6f61"]

export default function DashboardMobile() {
  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-black via-[#0a0f1f] to-[#001f1f] text-white">
      
      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        
        {/* Carte bancaire */}
        <motion.div
          className="bg-gradient-to-br from-[#00ff9d] to-[#006666] p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-lg">BANQUE FUTURISTE</h2>
          <p className="text-xl font-bold mt-6 tracking-widest">**** **** **** 1234</p>
          <div className="flex justify-between mt-8">
            <p className="text-sm">Adwin</p>
            <p className="text-sm">12/28</p>
          </div>
        </motion.div>

        {/* Graphique */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg w-full max-w-sm mx-auto mt-6">
          <h3 className="text-lg mb-4">Dépenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg w-full max-w-sm mx-auto mt-6">
          <h3 className="text-lg mb-4">Transactions récentes</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Amazon</span>
              <span className="text-red-400">-120€</span>
            </li>
            <li className="flex justify-between">
              <span>Salaire</span>
              <span className="text-green-400">+2000€</span>
            </li>
            <li className="flex justify-between">
              <span>Uber</span>
              <span className="text-red-400">-15€</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Menu en bas */}
      <div className="fixed bottom-0 w-full bg-black/70 backdrop-blur-xl border-t border-white/20 flex justify-around py-3">
        <Home className="w-6 h-6 text-[#00ff9d]" />
        <CreditCard className="w-6 h-6 text-gray-400" />
        <BarChart3 className="w-6 h-6 text-gray-400" />
        <User className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  )
}
